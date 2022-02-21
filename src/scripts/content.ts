import {isPageAlbum} from '../utils/is-page-album';
import {isPageTrack} from '../utils/is-page-track';
import {Keyboard} from '../modules/keyboard';
import {Volume} from '../modules/volume';
import {Bandcamp} from '../modules/bandcamp';
import {Speed} from '../modules/speed';

window.addEventListener('load', () => {
  if (isPageAlbum()) {
    Bandcamp.movePlaylist();
  }

  if (
    isPageAlbum()
    || isPageTrack()
  ) {
    const speed = new Speed();
    const volume = new Volume();

    Bandcamp.insertBelowPlayer(speed.getNode());
    Bandcamp.insertBelowPlayer(volume.getNode());
    Bandcamp.rectifyMargins();

    Keyboard.start({volume});
  }
});
