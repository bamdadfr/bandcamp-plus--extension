import {getArtist} from './get-artist';
import {getTitle} from './get-title';

/**
 * Utility function to copy the current song info to the clipboard.
 */
export async function copyInfoToClipboard() {
  const artist = getArtist();
  const title = getTitle();

  await navigator.clipboard.writeText(`${artist} ${title}`);
}
