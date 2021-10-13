import { getArtist } from '../../utils/get-artist'
import { getTitle } from '../../utils/get-title'

/**
 * @returns {HTMLSpanElement} copy track info button component
 */
export function CopyTrackInfoComponent () {

    const container = document.createElement ('span')

    container.style.border = '1px solid black'

    container.style.padding = '3px 3px 0px 3px'

    container.style.fontWeight = 'bold'

    container.style.cursor = 'pointer'

    container.style.userSelect = 'none'

    const span = document.createElement ('span')

    span.innerText = 'C'

    container.addEventListener ('click', async () => {

        const artist = getArtist ()
        const title = getTitle ()

        await navigator.clipboard.writeText (`${artist} ${title}`)
    
    })

    container.appendChild (span)

    return container

}