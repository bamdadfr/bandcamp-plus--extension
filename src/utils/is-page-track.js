/**
 * Utility to check if a track is a page track.
 *
 * @returns {boolean} - True if the track is a page track.
 */
export function isPageTrack() {
  return /bandcamp.com\/track\//
    .exec(document.location.href)
    !== null;
}
