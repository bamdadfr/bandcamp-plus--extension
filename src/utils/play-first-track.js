import { getTracks } from './get-tracks';

/**
 * Play the first track in the playlist.
 */
export function playFirstTrack () {
  const tracks = getTracks ();

  const firstTrackContainer = tracks
    ?.children[0]
    ?.children[0];

  if (!firstTrackContainer) {
    return;
  }

  const firstTrackPlayButton = firstTrackContainer
    ?.children[0]
    ?.children[0]
    ?.children[0];

  if (!firstTrackPlayButton) {
    return;
  }

  if (firstTrackPlayButton.classList.contains ('playing')) {
    return;
  }

  firstTrackPlayButton.click ();
}