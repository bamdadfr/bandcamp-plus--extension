/**
 * Utility to check if the current page is a track page.
 *
 * @returns {boolean}
 *    True if the track is a page track.
 */
export function isPageTrack(): boolean {
  return /bandcamp.com\/track\//
    .exec(document.location.href)
    !== null;
}
