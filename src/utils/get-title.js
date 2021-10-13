import { isPageAlbum } from './is-page-album'
import { isPageTrack } from './is-page-track'

/**
 * @returns {string|void} current title
 */
export function getTitle () {

    if (!(isPageAlbum () || isPageTrack ())) return

    return document.getElementsByClassName ('title-section')[0]
        .innerText

}