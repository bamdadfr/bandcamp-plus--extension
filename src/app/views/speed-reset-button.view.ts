import {ButtonComponent} from '../components/button.component';
import {TIMEOUT} from '../constants';

export class SpeedResetButtonView {
  public node: ButtonComponent;

  private readonly defaultText = 'Speed';

  private readonly activeText = 'Reset!';

  constructor() {
    this.node = this.createButton();
  }

  public renderClick(): void {
    this.node.getNode().textContent = this.activeText;

    setTimeout(() => {
      this.renderDefault();
    }, TIMEOUT);
  }

  private createButton() {
    return new ButtonComponent(this.defaultText);
  }

  private renderDefault() {
    this.node.getNode().textContent = this.defaultText;
  }
}
