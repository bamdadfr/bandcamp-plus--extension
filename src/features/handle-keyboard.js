import { copyInfoToClipboard } from '../utils/copy-info-to-clipboard'
import { getPlayButton } from '../utils/get-play-button'
import { getNextButton } from '../utils/get-next-button'
import { getPreviousButton } from '../utils/get-previous-button'
import { getAudio } from '../utils/get-audio'
import { SEEK_STEP } from '../utils/constants'
import { changeVolume } from '../utils/change-volume'
import { playFirstTrack } from '../utils/play-first-track'

/**
 *
 */
export function handleKeyboard () {

    const play = getPlayButton ()
    const next = getNextButton ()
    const previous = getPreviousButton ()
    const audio = getAudio ()

    document.addEventListener ('keydown', async (e) => {

        if (
            e.code === 'Space'
            || e.code === 'ArrowLeft'
            || e.code === 'ArrowRight'
            || e.code === 'ArrowDown'
            || e.code === 'ArrowUp'
        ) {

            e.preventDefault ()

        }

        if (e.code === 'KeyC') await copyInfoToClipboard ()

        if (e.code === 'Space') play.click ()

        if (
            e.code === 'KeyP'
            && e.shiftKey === false
        ) previous.click ()

        if (e.code === 'KeyN') next.click ()

        if (
            e.code === 'KeyP'
            && e.shiftKey === true
        ) playFirstTrack ()

        if (e.code === 'ArrowRight') audio.currentTime += SEEK_STEP

        if (
            e.code === 'ArrowLeft'
            && e.shiftKey === false
        ) audio.currentTime -= SEEK_STEP

        if (
            e.code === 'ArrowLeft'
            && e.shiftKey === true
        ) audio.currentTime = 0

        if (e.code === 'ArrowUp') changeVolume ()

        if (e.code === 'ArrowDown') changeVolume (false)
        
    })

}