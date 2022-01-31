import {playFirstTrack} from './play-first-track';
import {getAudio} from './get-audio';

/**
 * Utility function to get keyboard events with shift key pressed.
 *
 * @returns {object} - Keyboard events with shift key pressed.
 */
export function getKeyboardEventsWithShift() {
  const audio = getAudio();

  return {
    KeyP: () => playFirstTrack(),
    ArrowLeft: () => {
      audio.currentTime = 0;
    },
  };
}
