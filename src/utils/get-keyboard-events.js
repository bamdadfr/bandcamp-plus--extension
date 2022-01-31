import {getPlayButton} from './get-play-button';
import {getNextButton} from './get-next-button';
import {getPreviousButton} from './get-previous-button';
import {getAudio} from './get-audio';
import {copyInfoToClipboard} from './copy-info-to-clipboard';
import {SEEK_STEP} from '../constants';
import {changeVolume} from './change-volume';

/**
 * Utility function to get the keyboard events.
 *
 * @returns {object} - The keyboard events.
 */
export function getKeyboardEvents() {
  const play = getPlayButton();
  const next = getNextButton();
  const previous = getPreviousButton();
  const audio = getAudio();

  return {
    KeyC: async () => await copyInfoToClipboard(),
    Space: () => play.click(),
    KeyP: () => previous.click(),
    KeyN: () => next.click(),
    ArrowRight: () => {
      audio.currentTime += SEEK_STEP;
    },
    ArrowLeft: () => {
      audio.currentTime -= SEEK_STEP;
    },
    ArrowUp: () => changeVolume(),
    ArrowDown: () => changeVolume(false),
  };
}
