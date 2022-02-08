import {isPageAlbum} from '../utils/is-page-album';
import {isPageTrack} from '../utils/is-page-track';
import {isFirefox} from '../utils/is-firefox';
import {Keyboard} from '../modules/keyboard';
import {Volume} from '../modules/volume';
import {Speed} from '../modules/speed';
import {TrackInfo} from '../modules/track-info';
import {Bandcamp} from '../modules/bandcamp';

window.addEventListener('load', () => {
  if (isPageAlbum()) {
    Bandcamp.movePlaylist();
  }

  if (
    isPageAlbum()
    || isPageTrack()
  ) {
    if (isFirefox()) {
      const speed = new Speed(1);
      Bandcamp.insertBelowPlayer(speed.getNode());
    }

    const volume = new Volume(0.7);
    Bandcamp.insertBelowPlayer(volume.getNode());

    const copyTrackInfo = new TrackInfo();
    Bandcamp.insertBelowPlayer(copyTrackInfo.getNode());

    Keyboard.start({volume});

    Bandcamp.rectifyMargins();
  }
});
