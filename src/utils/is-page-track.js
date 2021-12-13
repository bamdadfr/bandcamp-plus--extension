/**
 * @returns {boolean} is page track?
 */
export function isPageTrack() {
  return /bandcamp.com\/track\//
    .exec(document.location.href)
    !== null;
}
