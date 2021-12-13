import {
  CopyTrackInfoComponent,
} from '../components/copy-track-info/copy-track-info.component';
import {getPlayer} from '../utils/get-player';

/**
 * Copy track info to clipboard
 */
export function copyTrackInfo() {
  const player = getPlayer();
  if (player) {
    const copyTrackInfo = CopyTrackInfoComponent();
    player.insertAdjacentElement('afterend', copyTrackInfo);
  }
}
