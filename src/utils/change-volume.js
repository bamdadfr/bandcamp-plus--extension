import { VOLUME_LABEL_ID, VOLUME_SLIDER_ID, VOLUME_STEP } from './constants';

/**
 * @param {boolean} [increase=true] set to false to decrease
 */
export function changeVolume (increase = true) {
  const volumeSlider = document.getElementById (VOLUME_SLIDER_ID);
  const volumeLabel = document.getElementById (VOLUME_LABEL_ID);
  let volume = parseFloat (volumeSlider.value);

  if (increase) {
    volume += VOLUME_STEP;
  } else {
    volume -= VOLUME_STEP;
  }

  volumeSlider.value = volume.toString ();
  volumeLabel.innerText = volumeSlider.value;
  volumeSlider.dispatchEvent (new Event ('input'));
}
