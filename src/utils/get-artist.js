import { isPageAlbum } from './is-page-album'
import { isPageTrack } from './is-page-track'

/**
 * @returns {string|void} current artist
 */
export function getArtist () {

    if (!(isPageAlbum () || isPageTrack ())) return

    return document.getElementById ('name-section')
        .children[1]
        .children[0]
        .innerText

}