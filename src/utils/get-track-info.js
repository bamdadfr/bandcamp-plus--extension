import { isPageAlbum } from './is-page-album'
import { isPageTrack } from './is-page-track'

/**
 * @returns {HTMLSpanElement|void} current track info container
 */
export function getTrackInfo () {

    if (!(isPageAlbum () || isPageTrack ())) return

    return document.getElementsByClassName ('track_info')[0]

}