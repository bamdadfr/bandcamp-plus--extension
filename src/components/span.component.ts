export interface SpanProps {
  text: string;
  id?: string;
}

/**
 * Class to render a span element.
 * Use to display text.
 */
export class SpanComponent {
  private readonly node: HTMLSpanElement;

  private id: string;

  private readonly defaultText: string;

  constructor({text, id}: SpanProps) {
    if (id) {
      this.id = id;
    }

    this.node = document.createElement('span');
    this.node.textContent = this.defaultText;

    this.defaultText = text;
  }

  public getNode(): HTMLSpanElement {
    return this.node;
  }

  public update(text: string): void {
    this.node.textContent = text;
  }

  public reset(): void {
    this.node.textContent = this.defaultText;
  }
}
