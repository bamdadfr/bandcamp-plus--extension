import { isPageAlbum } from './is-page-album'

/**
 * @description position track list right under the player
 *          only for albums
 */
export function moveTrackList () {

    if (!isPageAlbum ()) return

    const player = document.getElementsByClassName ('inline_player')[0]
    const tracks = document.getElementById ('track_table')

    player.insertAdjacentElement ('afterend', tracks)

}