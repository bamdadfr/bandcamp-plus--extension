import { getAudio } from '../utils/get-audio'
import { SEEK_STEP } from '../utils/constants'

/**
 *
 */
export function seekForward () {

    const audio = getAudio ()

    audio.currentTime += SEEK_STEP

}