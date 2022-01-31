import {copyInfoToClipboard} from '../utils/copy-info-to-clipboard';
import {ButtonComponent} from '../components/button.component';
import {TIMEOUT} from '../constants';

/**
 * Module for the copy track info feature.
 *
 * @returns {HTMLSpanElement} - The copy track info button.
 */
export function CopyTrackInfoModule() {
  const span = document.createElement('span');
  span.innerText = 'Copy';

  const onClick = async () => {
    await copyInfoToClipboard();
    span.innerText = 'Copied!';

    setTimeout(() => {
      span.innerText = 'Copy';
    }, TIMEOUT);
  };

  return ButtonComponent({
    child: span,
    onClick,
  });
}
