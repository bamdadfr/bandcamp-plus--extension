import {TIMEOUT} from '../constants';
import {Colors} from '../common/colors';

/**
 * Class to represent a button.
 * Contains a text and onClick event.
 */
export class ButtonComponent {
  private readonly node: HTMLSpanElement;

  private readonly defaultText: string;

  private readonly clickTimeout: number;

  constructor(text: string) {
    // props
    this.defaultText = text;
    this.clickTimeout = TIMEOUT;

    // elements
    this.node = document.createElement('span');
    this.node.textContent = this.defaultText;

    // styles
    this.applyStyles();
  }

  public getNode(): HTMLSpanElement {
    return this.node;
  }

  public onClick(callback: () => void): void {
    this.node.onclick = callback;
  }

  /**
   * Method to apply the styles to the button.
   */
  private applyStyles() {
    this.node.style.display = 'flex';
    this.node.style.justifyContent = 'center';
    this.node.style.alignItems = 'center';

    this.node.style.width = '54px';
    this.node.style.height = '50px';

    this.node.style.fontWeight = 'bold';
    this.node.style.color = Colors.theme.black;
    this.node.style.background = Colors.theme.white;
    this.node.style.border = `1px solid ${Colors.theme.gray}`;

    this.node.style.userSelect = 'none';
    this.node.style.cursor = 'pointer';
  }
}
