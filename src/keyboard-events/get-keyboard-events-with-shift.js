import {playFirstTrack} from '../utils/play-first-track';
import {getAudio} from '../utils/get-audio';

/**
 * @returns {object} object lookup for events with shift modifier key enabled
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
