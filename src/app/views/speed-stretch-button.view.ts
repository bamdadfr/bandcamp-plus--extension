import {ButtonComponent} from '../components/button.component';
import {AbstractObserver} from '../common/abstract.observer';
import {SpeedController} from '../controllers/speed.controller';

export class SpeedStretchButtonView implements AbstractObserver {
  public node: ButtonComponent;

  private readonly defaultText = 'Vinyl';

  private readonly otherText = 'Stretch';

  constructor() {
    this.node = new ButtonComponent(this.defaultText);
  }

  public update(c: SpeedController): void {
    if (c.isStretch) {
      this.node.getNode().textContent = this.otherText;
    } else {
      this.node.getNode().textContent = this.defaultText;
    }
  }
}
