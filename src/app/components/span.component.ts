/**
 * Class to render a span element.
 * Use to display text.
 */
export class SpanComponent {
  private readonly node: HTMLSpanElement;

  private readonly defaultText: string;

  constructor(text: string) {
    this.defaultText = text;

    this.node = document.createElement('span');
    this.node.textContent = this.defaultText;
  }

  public getNode(): HTMLSpanElement {
    return this.node;
  }

  public render(text: string): void {
    this.node.textContent = text;
  }

  public reset(): void {
    this.node.textContent = this.defaultText;
  }
}
