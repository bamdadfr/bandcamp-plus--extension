/**
 * @returns {boolean} is page album?
 */
export function isPageAlbum () {
  return /bandcamp.com\/album\//
    .exec (document.location.href)
    !== null;
}
