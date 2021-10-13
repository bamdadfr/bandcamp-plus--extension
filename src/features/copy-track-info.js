import { getTrackInfo } from '../utils/get-track-info'
import { CopyTrackInfoComponent } from '../components/copy-track-info/copy-track-info.component'

/**
 *
 */
export function copyTrackInfo () {
    
    const info = getTrackInfo ()
    const copyTrackInfo = CopyTrackInfoComponent ()

    info.insertAdjacentElement ('afterbegin', copyTrackInfo)

}