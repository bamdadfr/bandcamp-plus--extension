import { getPlayer } from '../utils/get-player';
import { getTracks } from '../utils/get-tracks';

/**
 * @description position track list right below the player
 */
export function moveTrackList () {
  const player = getPlayer ();

  if (!player) {
    return;
  }

  const tracks = getTracks ();
  player.insertAdjacentElement ('afterend', tracks);
}
