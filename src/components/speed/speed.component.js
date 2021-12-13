import speedToPercentage from 'speed-to-percentage';
import {SpanComponent} from '../volume/components/span.component';
import {InputComponent} from '../volume/components/input.component';
import {
  SPEED_LABEL_ID,
  SPEED_SLIDER_ID,
} from '../../utils/constants';
import {getAudio} from '../../utils/get-audio';

/**
 * @param {object} options options
 * @param {number} options.defaultValue volume default value
 * @returns {HTMLDivElement} volume div element
 */
export function SpeedComponent({defaultValue}) {
  const container = document.createElement('div');
  container.style.display = 'grid';
  container.style.alignItems = 'center';
  container.style.gridTemplateColumns = '3em 1fr 2em';
  container.style.gridGap = '1em';
  container.style.height = '3em';

  const title = SpanComponent({
    value: 'Speed',
  });

  const input = InputComponent({
    defaultValue,
    id: SPEED_SLIDER_ID,
    min: 0.5,
    max: 1.5,
    step: 0.01,
  });

  const span = SpanComponent({
    value: speedToPercentage(defaultValue) + '%',
    id: SPEED_LABEL_ID,
  });

  const audio = getAudio();

  audio.onplay = () => {
    if (audio.mozPreservesPitch === true) {
      audio.mozPreservesPitch = false;
    }

    const speed = parseFloat(input.value);
    if (audio.playbackRate !== speed) {
      audio.playbackRate = speed;
    }
  };

  input.addEventListener('input', (e) => {
    const speed = e.target.value;
    const percentage = speedToPercentage(parseFloat(speed)) + '%';
    const audio = getAudio();

    audio.mozPreservesPitch = false;
    audio.playbackRate = speed;
    span.innerText = percentage;
  });

  container.appendChild(title);
  container.appendChild(input);
  container.appendChild(span);

  return container;
}
