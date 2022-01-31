import {getPlayer} from '../utils/get-player';
import {getTracks} from '../utils/get-tracks';

/**
 * Move the playlist right after the player.
 */
export function movePlaylist() {
  const player = getPlayer();
  if (player) {
    const tracks = getTracks();
    player.insertAdjacentElement('afterend', tracks);
  }
}
