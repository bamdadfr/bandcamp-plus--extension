import {
  CopyTrackInfoModule,
} from '../modules/copy-track-info.module';
import {getPlayer} from '../utils/get-player';

/**
 * Copy track info to clipboard
 */
export function copyTrackInfo() {
  const player = getPlayer();
  if (player) {
    const copyTrackInfo = CopyTrackInfoModule();
    player.insertAdjacentElement('afterend', copyTrackInfo);
  }
}
