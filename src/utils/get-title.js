import { isPageTrack } from './is-page-track';
import { isPageAlbum } from './is-page-album';

/**
 * @returns {string} current title
 */
export function getTitle () {
  if (isPageTrack ()) {
    return document.getElementsByClassName ('trackTitle')[0]
      .innerText;
  }

  if (isPageAlbum ()) {
    return document.getElementsByClassName ('title-section')[0]
      .innerText;
  }
}
