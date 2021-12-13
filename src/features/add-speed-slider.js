import {getPlayer} from '../utils/get-player';
import {SpeedComponent} from '../components/speed/speed.component';

/**
 * Adds a speed slider to the player.
 */
export function addSpeedSlider() {
  const player = getPlayer();
  if (player) {
    const speed = SpeedComponent({'defaultValue': 1});
    player.insertAdjacentElement('afterend', speed);
  }
}
