import {ButtonComponent} from '../components/button.component';
import {TIMEOUT} from '../constants';

export class VolumeResetButtonView {
  public node: ButtonComponent;

  private defaultText = 'Volume';

  private activeText = 'Reset!';

  constructor() {
    this.node = this.createButton();
  }

  public renderClick(): void {
    this.node.getNode().textContent = this.activeText;

    setTimeout(() => {
      this.renderDefault();
    }, TIMEOUT);
  }

  public renderDefault(): void {
    this.node.getNode().textContent = this.defaultText;
  }

  private createButton(): ButtonComponent {
    return new ButtonComponent(this.defaultText);
  }
}
