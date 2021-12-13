import {getPlayer} from '../utils/get-player';
import {VolumeComponent} from '../components/volume/volume.component';

/**
 * Adds a volume slider to the player.
 */
export function addVolumeSlider() {
  const player = getPlayer();
  if (player) {
    const volume = VolumeComponent({'defaultValue': 0.7});
    player.insertAdjacentElement('afterend', volume);
  }
}
