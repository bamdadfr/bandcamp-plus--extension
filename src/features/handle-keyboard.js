import { copyInfoToClipboard } from '../utils/copy-info-to-clipboard'
import { getPlayButton } from '../utils/get-play-button'
import { getNextButton } from '../utils/get-next-button'
import { getPreviousButton } from '../utils/get-previous-button'
import { getAudio } from '../utils/get-audio'
import { SEEK_STEP } from '../utils/constants'

/**
 *
 */
export function handleKeyboard () {

    const playButton = getPlayButton ()
    const nextButton = getNextButton ()
    const previousButton = getPreviousButton ()
    const audio = getAudio ()

    document.addEventListener ('keydown', async (e) => {

        e.preventDefault ()

        if (e.code === 'KeyC') await copyInfoToClipboard ()

        if (e.code === 'Space') playButton.click ()

        if (e.code === 'KeyP') previousButton.click ()

        if (e.code === 'KeyN') nextButton.click ()

        if (e.code === 'ArrowRight') audio.currentTime += SEEK_STEP

        if (
            e.code === 'ArrowLeft'
            && e.shiftKey === false
        ) audio.currentTime -= SEEK_STEP

        if (
            e.code === 'ArrowLeft'
            && e.shiftKey === true
        ) audio.currentTime = 0

    })

}