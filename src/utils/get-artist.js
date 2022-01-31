/**
 * Utility function to get the artist name from a track.
 *
 * @returns {string} - The artist name.
 */
export function getArtist() {
  return document.getElementById('name-section')
    .children[1]
    .children[0]
    .innerText;
}
