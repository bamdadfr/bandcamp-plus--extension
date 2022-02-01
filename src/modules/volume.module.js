import {InputComponent} from '../components/input.component';
import {SpanComponent} from '../components/span.component';
import {getAudio} from '../utils/get-audio';
import {TIMEOUT, VOLUME_LABEL_ID, VOLUME_SLIDER_ID} from '../constants';
import {ButtonComponent} from '../components/button.component';
import {GridComponent} from '../components/grid.component';

/**
 * Module for volume control.
 *
 * @param {object} options - Options for the module.
 * @param {number} options.defaultValue - The default value of the volume.
 * @returns {HTMLDivElement} - The volume module.
 */
export function VolumeModule({defaultValue}) {
  // container
  const grid = GridComponent();
  grid.style.margin = '1em 0';

  // label
  const label = SpanComponent({
    value: (defaultValue * 100).toFixed(0) + ' %',
    id: VOLUME_LABEL_ID,
  });

  // slider
  const slider = InputComponent({
    defaultValue,
    id: VOLUME_SLIDER_ID,
  });

  slider.addEventListener('input', (e) => {
    const volume = e.target.value;
    const audio = getAudio();

    audio.volume = volume;
    label.innerText = (volume * 100).toFixed(0) + ' %';

    slider.style.setProperty('--ratio', volume);
  });

  // populate
  const title = SpanComponent({
    value: 'Volume',
  });

  const button = ButtonComponent({
    child: title,
    onClick: () => {
      const audio = getAudio();
      if (audio.volume === defaultValue) {
        return;
      }

      audio.volume = defaultValue;
      slider.value = defaultValue.toString();
      label.innerText = (defaultValue * 100).toFixed(0) + ' %';
      slider.style.setProperty('--ratio', defaultValue);

      title.innerText = 'Reset!';
      setTimeout(() => {
        title.innerText = 'Volume';
      }, TIMEOUT);
    },
  });

  // append
  grid.appendChild(button);

  const flex = document.createElement('div');
  flex.style.display = 'flex';
  flex.style.height = '100%';
  flex.style.justifyContent = 'space-around';
  flex.style.flexDirection = 'column';
  label.style.transform = 'translateY(4px)';

  flex.appendChild(label);
  flex.appendChild(slider);
  grid.appendChild(flex);

  return grid;
}
