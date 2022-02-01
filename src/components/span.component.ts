interface SpanProps {
  text: string;
  id?: string;
}

/**
 * Class to render a span element.
 * Use to display text.
 */
export class SpanComponent {
  private node: HTMLSpanElement;

  private id: string;

  private readonly defaultText: string;

  constructor({
    text,
    id,
  }: SpanProps) {
    if (id) {
      this.id = id;
    }

    this.defaultText = text;

    this.initialize();
  }

  public update(text: string): void {
    this.node.innerText = text;
  }

  public reset(): void {
    this.node.innerText = this.defaultText;
  }

  public getNode(): HTMLSpanElement {
    return this.node;
  }

  private initialize() {
    this.node = document.createElement('node');
    this.node.innerText = this.defaultText;
  }
}
