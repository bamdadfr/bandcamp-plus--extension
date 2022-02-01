import speedToPercentage from 'speed-to-percentage';
import speedToSemitones from 'speed-to-semitones';
import {SpanComponent} from '../components/span.component';
import {InputComponent} from '../components/input.component';
import {SPEED_SLIDER_ID, TIMEOUT} from '../constants';
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
  const percentage = SpanComponent({
    value: speedToPercentage(defaultValue) + ' %',
  });

  const semitones = SpanComponent({
    value: speedToSemitones(defaultValue) + ' st',
  });

  const labels = document.createElement('div');
  labels.appendChild(percentage);
  labels.appendChild(semitones);
  labels.style.display = 'flex';
  labels.style.width = '250px';
  labels.style.justifyContent = 'space-between';
  labels.style.transform = 'translateY(4px)';

  // slider
  const slider = InputComponent({
    defaultValue,
    id: SPEED_SLIDER_ID,
    min: 0.5,
    max: 1.5,
    step: 0.005,
  });

  slider.addEventListener('input', (e) => {
    const speed = e.target.value;
    const audio = getAudio();

    audio.mozPreservesPitch = false;
    audio.playbackRate = speed;
    percentage.innerText = speedToPercentage(parseFloat(speed)) + ' %';
    semitones.innerText = speedToSemitones(parseFloat(speed), 1) + ' st';
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
      percentage.innerText = speedToPercentage(parseFloat(defaultValue)) + ' %';
      semitones.innerText = speedToSemitones(parseFloat(defaultValue), 1) + ' st';

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

  const flex = document.createElement('div');
  flex.style.display = 'flex';
  flex.style.height = '100%';
  flex.style.justifyContent = 'space-around';
  flex.style.flexDirection = 'column';

  flex.appendChild(labels);
  flex.appendChild(slider);
  grid.appendChild(flex);

  return grid;
}
