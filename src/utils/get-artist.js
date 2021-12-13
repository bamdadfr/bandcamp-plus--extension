/**
 * @returns {string} current artist
 */
export function getArtist() {
  return document.getElementById('name-section')
    .children[1]
    .children[0]
    .innerText;
}
