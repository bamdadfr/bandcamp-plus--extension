import { getTracks } from './get-tracks'

/**
 *
 */
export function playFirstTrack () {

    const tracks = getTracks ()

    const firstTrackContainer = tracks
        ?.children[0]
        ?.children[0]

    if (!firstTrackContainer) return

    const firstTrackPlayButton = firstTrackContainer
        ?.children[0]
        ?.children[0]
        ?.children[0]

    if (firstTrackPlayButton) firstTrackPlayButton.click ()

}