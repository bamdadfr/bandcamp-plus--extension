import {InputComponent} from '../components/input.component';
import {DEFAULT_VOLUME} from '../constants';
import {AbstractObserver} from '../common/abstract.observer';
import {VolumeController} from '../controllers/volume.controller';

export class VolumeSliderView implements AbstractObserver {
  public node: InputComponent;

  private defaultVolume = DEFAULT_VOLUME;

  constructor() {
    this.node = this.createSlider();
  }

  public update(c: VolumeController): void {
    const volume = c.volume.toString();
    const node = this.node.getNode();

    node.value = volume;
    node.style.setProperty('--ratio', volume);
  }

  private createSlider() {
    return new InputComponent({
      value: this.defaultVolume,
    });
  }
}
