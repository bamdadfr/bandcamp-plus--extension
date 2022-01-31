import speedToPercentage from 'speed-to-percentage';
import {SpanComponent} from '../components/span.component';
import {InputComponent} from '../components/input.component';
import {
  SPEED_LABEL_ID,
  SPEED_SLIDER_ID, TIMEOUT,
} from '../constants';
import {getAudio} from '../utils/get-audio';
import {ButtonComponent} from '../components/button.component';
import {GridComponent} from '../components/grid.component';

/**
 * Module for speed control.
 *
 * @param {object} options - Options for the module.
 * @param {number} options.defaultValue - Default value for the speed.
 * @returns {HTMLDivElement} - The speed module.
 */
export function SpeedModule({defaultValue}) {
  // container
  const grid = GridComponent();

  // label
  const label = SpanComponent({
    value: speedToPercentage(defaultValue) + '%',
    id: SPEED_LABEL_ID,
  });

  // slider
  const slider = InputComponent({
    defaultValue,
    id: SPEED_SLIDER_ID,
    min: 0.5,
    max: 1.5,
    step: 0.01,
  });

  slider.addEventListener('input', (e) => {
    const speed = e.target.value;
    const percentage = speedToPercentage(parseFloat(speed)) + '%';
    const audio = getAudio();

    audio.mozPreservesPitch = false;
    audio.playbackRate = speed;
    label.innerText = percentage;
  });

  // button
  const title = SpanComponent({value: 'Speed'});
  const button = ButtonComponent({
    child: title,
    onClick: () => {
      const audio = getAudio();
      if (audio.playbackRate === defaultValue) {
        return;
      }

      audio.playbackRate = defaultValue;
      slider.value = defaultValue.toString();
      label.innerText = defaultValue.toString();

      title.innerText = 'Reset!';
      setTimeout(() => {
        title.innerText = 'Speed';
      }, TIMEOUT);
    },
  });

  // audio listener
  const audio = getAudio();
  audio.onplay = () => {
    if (audio.mozPreservesPitch === true) {
      audio.mozPreservesPitch = false;
    }

    const speed = parseFloat(slider.value);
    if (audio.playbackRate !== speed) {
      audio.playbackRate = speed;
    }
  };

  // populate
  grid.appendChild(button);
  grid.appendChild(slider);
  grid.appendChild(label);

  return grid;
}
