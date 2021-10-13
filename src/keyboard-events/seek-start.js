import { getAudio } from '../utils/get-audio'

/**
 *
 */
export function seekStart () {

    const audio = getAudio ()

    audio.currentTime = 0

}