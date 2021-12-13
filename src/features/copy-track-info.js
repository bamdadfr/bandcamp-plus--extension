import {getTrackInfo} from '../utils/get-track-info';
import {
  CopyTrackInfoComponent,
} from '../components/copy-track-info/copy-track-info.component';

/**
 * Copy track info to clipboard
 */
export function copyTrackInfo() {
  const info = getTrackInfo();
  const copyTrackInfo = CopyTrackInfoComponent();

  info.insertAdjacentElement('afterbegin', copyTrackInfo);
}
