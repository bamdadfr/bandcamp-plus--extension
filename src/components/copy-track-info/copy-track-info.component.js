import {copyInfoToClipboard} from '../../utils/copy-info-to-clipboard';

/**
 * @returns {HTMLSpanElement} copy track info button component
 */
export function CopyTrackInfoComponent() {
  const container = document.createElement('span');
  container.style.border = '1px solid black';
  container.style.padding = '3px 3px 0px 3px';
  container.style.fontWeight = 'bold';
  container.style.cursor = 'pointer';
  container.style.userSelect = 'none';

  const span = document.createElement('span');
  span.innerText = 'Copy';

  container.addEventListener('click', async () => {
    await copyInfoToClipboard();
  });

  container.appendChild(span);

  return container;
}
