import { isPageAlbum } from './is-page-album'
import { isPageTrack } from './is-page-track'

/**
 * @returns {HTMLAudioElement} bandcamp audio element
 */
export function getAudio () {

    if (!(isPageAlbum () || isPageTrack ())) return

    return document.getElementsByTagName ('audio')[0]

}