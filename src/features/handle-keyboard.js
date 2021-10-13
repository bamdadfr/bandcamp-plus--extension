import { playPause } from '../keyboard-events/play-pause'
import { previous } from '../keyboard-events/previous'
import { next } from '../keyboard-events/next'
import { seekForward } from '../keyboard-events/seek-forward'
import { seekBackward } from '../keyboard-events/seek-backward'
import { seekStart } from '../keyboard-events/seek-start'
import { copyInfoToClipboard } from '../utils/copy-info-to-clipboard'

/**
 *
 */
export function handleKeyboard () {

    document.addEventListener ('keydown', async (e) => {

        e.preventDefault ()

        if (e.code === 'KeyC') await copyInfoToClipboard ()

        if (e.code === 'Space') playPause ()

        if (e.code === 'KeyP') previous ()

        if (e.code === 'KeyN') next ()

        if (e.code === 'ArrowRight') seekForward ()

        if (e.code === 'ArrowLeft') seekBackward ()

        if (
            e.code === 'ArrowLeft'
            && e.shiftKey === true
        ) seekStart ()

    })

}