import {VOLUME_LABEL_ID, VOLUME_SLIDER_ID, VOLUME_STEP} from '../constants';

/**
 * Utility function to change the volume of the player.
 *
 * @param {boolean} [increase=true] - Whether to increase or decrease the volume.
 */
export function changeVolume(increase = true) {
  const slider = document.getElementById(VOLUME_SLIDER_ID);
  const label = document.getElementById(VOLUME_LABEL_ID);

  let volume = parseFloat(slider.value);

  if (increase) {
    volume += VOLUME_STEP;
  } else {
    volume -= VOLUME_STEP;
  }

  slider.value = volume.toString();
  label.innerText = slider.value;

  slider.dispatchEvent(new Event('input'));
}
