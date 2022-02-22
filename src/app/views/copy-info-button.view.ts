import {ButtonComponent} from '../components/button.component';
import {TIMEOUT} from '../constants';

export class CopyInfoButtonView {
  public node: ButtonComponent;

  private readonly defaultText = 'Copy';

  private readonly activeText = 'Copied!';

  constructor() {
    this.node = new ButtonComponent(this.defaultText);
  }

  public renderClick(): void {
    this.node.getNode().textContent = this.activeText;

    setTimeout(() => {
      this.renderDefault();
    }, TIMEOUT);
  }

  private renderDefault() {
    this.node.getNode().textContent = this.defaultText;
  }
}
