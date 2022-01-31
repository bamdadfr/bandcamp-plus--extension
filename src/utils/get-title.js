import {isPageTrack} from './is-page-track';
import {isPageAlbum} from './is-page-album';

/**
 * Utility function to get the title of a track or album.
 *
 * @returns {string} - The title of the track or album.
 */
export function getTitle() {
  if (isPageTrack()) {
    return document.getElementsByClassName('trackTitle')[0]
      .innerText;
  }

  if (isPageAlbum()) {
    return document.getElementsByClassName('title-section')[0]
      .innerText;
  }
}
