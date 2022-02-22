import {InputComponent} from '../components/input.component';
import {DEFAULT_SPEED} from '../constants';
import {AbstractObserver} from '../common/abstract.observer';
import {SpeedController} from '../controllers/speed.controller';
import {mapRange} from '../utils/map-range';

export class SpeedSliderView implements AbstractObserver {
  public node: InputComponent;

  constructor() {
    this.node = new InputComponent({
      value: DEFAULT_SPEED,
      min: 0.5,
      max: 1.5,
      step: 0.005,
    });
  }

  public update(c: SpeedController): void {
    const speed = c.speed.toString();
    const node = this.node.getNode();

    node.value = speed;

    const fillRatio = mapRange(c.speed, parseFloat(node.min), parseFloat(node.max), 0, 1);
    node.style.setProperty('--ratio', fillRatio.toString());
  }
}
