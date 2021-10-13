import { isPageAlbum } from './is-page-album'
import { isPageTrack } from './is-page-track'

/**
 * @returns {HTMLDivElement} bandcamp track list
 */
export function getTracks () {

    if (!(isPageAlbum () || isPageTrack ())) return

    return document.getElementById ('track_table')

}