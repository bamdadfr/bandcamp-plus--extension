import { isPageAlbum } from './is-page-album'
import { isPageTrack } from './is-page-track'

/**
 * @returns {HTMLDivElement|void} player element
 */
export function getPlayer () {

    if (!(isPageAlbum () || isPageTrack ())) return

    return document.getElementsByClassName ('inline_player')[0]

}