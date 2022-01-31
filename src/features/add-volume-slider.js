import {getPlayer} from '../utils/get-player';
import {VolumeModule} from '../modules/volume.module';

/**
 * Adds a volume slider to the player.
 */
export function addVolumeSlider() {
  const player = getPlayer();
  if (player) {
    const volume = VolumeModule({'defaultValue': 0.7});
    player.insertAdjacentElement('afterend', volume);
  }
}
