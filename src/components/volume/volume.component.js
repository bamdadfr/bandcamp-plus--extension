import { InputComponent } from './components/input.component'
import { SpanComponent } from './components/span.component'
import { getAudio } from '../../utils/get-audio'

/**
 * @param {object} options options
 * @param {number} options.defaultValue volume default value
 * @returns {HTMLDivElement} volume div element
 */
export function VolumeComponent ({ defaultValue }) {

    const container = document.createElement ('div')

    container.style.display = 'flex'

    container.style.justifyContent = 'flex-start'

    container.style.alignItems = 'center'

    container.style.gridGap = '1em'

    const input = InputComponent ({ defaultValue })
    const span = SpanComponent ({ defaultValue })

    input.addEventListener ('input', (e) => {

        const volume = e.target.value
        const audio = getAudio ()

        audio.volume = volume

        span.innerText = volume

    })

    container.appendChild (input)

    container.appendChild (span)

    return container

}