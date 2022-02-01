import {COLORS, TIMEOUT} from '../constants';

/**
 * Class to represent a button.
 * Contains a text and onClick event.
 */
export class ButtonComponent {
  private readonly node: HTMLSpanElement;

  private readonly content: HTMLSpanElement;

  private readonly text: string;

  private readonly clickTimeout: number;

  constructor(text: string) {
    // props
    this.text = text;
    this.clickTimeout = TIMEOUT;

    // elements
    this.node = document.createElement('span');
    this.content = document.createElement('span');
    this.content.innerText = this.text;
    this.node.appendChild(this.content);

    // styles
    this.applyStyles();
  }

  /**
   * Method to set the onClick event.
   *
   * @param {string} activeText
   *    The text to display when the button is clicked.
   * @param {function():boolean} callback
   *    The callback to execute when the button is clicked.
   *    It should return true to display the active text.
   */
  public onClick(activeText: string, callback: () => boolean): void {
    this.node.onclick = () => {
      const shouldContinue = callback();

      if (!shouldContinue) {
        return;
      }

      this.content.innerText = activeText;

      setTimeout(() => {
        this.content.innerText = this.text;
      }, this.clickTimeout);
    };
  }

  public getNode(): HTMLSpanElement {
    return this.node;
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
    this.node.style.color = COLORS.black;
    this.node.style.background = COLORS.white;
    this.node.style.border = `1px solid ${COLORS.gray}`;

    this.node.style.userSelect = 'none';
    this.node.style.cursor = 'pointer';
  }
}
