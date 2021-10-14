import { getPlayButton } from '../utils/get-play-button'
import { getNextButton } from '../utils/get-next-button'
import { getPreviousButton } from '../utils/get-previous-button'
import { getAudio } from '../utils/get-audio'
import { copyInfoToClipboard } from '../utils/copy-info-to-clipboard'
import { SEEK_STEP } from '../utils/constants'
import { changeVolume } from '../utils/change-volume'

/**
 * @returns {object} object lookup for keyboard events
 */
export function getKeyboardEvents () {

    const play = getPlayButton ()
    const next = getNextButton ()
    const previous = getPreviousButton ()
    const audio = getAudio ()

    return {
        'KeyC': async () => await copyInfoToClipboard (),
        'Space': () => play.click (),
        'KeyP': () => previous.click (),
        'KeyN': () => next.click (),
        'ArrowRight': () => {

            audio.currentTime += SEEK_STEP

        },
        'ArrowLeft': () => {

            audio.currentTime -= SEEK_STEP

        },
        'ArrowUp': () => changeVolume (),
        'ArrowDown': () => changeVolume (false),
    }

}