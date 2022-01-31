import {getPlayer} from '../utils/get-player';
import {SpeedModule} from '../modules/speed.module';

/**
 * Adds a speed slider to the player.
 */
export function addSpeedSlider() {
  const player = getPlayer();
  if (player) {
    const speed = SpeedModule({'defaultValue': 1});
    player.insertAdjacentElement('afterend', speed);
  }
}
