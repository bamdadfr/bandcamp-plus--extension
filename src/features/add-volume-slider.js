import { getPlayer } from '../utils/get-player'
import { VolumeComponent } from '../components/volume/volume.component'

/**
 * @description add volume slider
 */
export function addVolumeSlider () {

    const player = getPlayer ()

    if (!player) return

    const volume = VolumeComponent ({ 'defaultValue': 0.7 })

    player.insertAdjacentElement ('afterend', volume)

}