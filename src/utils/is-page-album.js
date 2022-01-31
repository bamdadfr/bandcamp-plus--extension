/**
 * Utility function to check if the current page is an album page.
 *
 * @returns {boolean} - True if the current page is an album page.
 */
export function isPageAlbum() {
  return /bandcamp.com\/album\//
    .exec(document.location.href)
    !== null;
}
