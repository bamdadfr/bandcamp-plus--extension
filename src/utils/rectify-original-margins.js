import {getPlayer} from './get-player';
import {getTracks} from './get-tracks';

/**
 * Utility function to rectify the original margins of the player and playlist.
 */
export function rectifyOriginalMargins() {
  const player = getPlayer();
  player.style.marginBottom = '1em';

  const tracks = getTracks();
  tracks.style.marginTop = '1em';
}
