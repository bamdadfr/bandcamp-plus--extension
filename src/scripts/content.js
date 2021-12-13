import {moveTrackList} from '../features/move-tracklist';
import {addVolumeSlider} from '../features/add-volume-slider';
import {copyTrackInfo} from '../features/copy-track-info';
import {handleKeyboard} from '../features/handle-keyboard';
import {isPageAlbum} from '../utils/is-page-album';
import {isPageTrack} from '../utils/is-page-track';
import {addSpeedSlider} from '../features/add-speed-slider';
import {isFirefox} from '../utils/is-firefox';

window.addEventListener('load', () => {
  if (isPageAlbum()) {
    moveTrackList();
  }

  if (
    isPageAlbum()
    || isPageTrack()
  ) {
    if (isFirefox()) {
      addSpeedSlider();
    }
    addVolumeSlider();
    copyTrackInfo();
    handleKeyboard();
  }
});
