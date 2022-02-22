export type GridChildren = {
  leftButton: HTMLSpanElement;
  topContent: HTMLSpanElement;
  bottomContent: HTMLInputElement;
  rightButton: HTMLSpanElement;
}

/**
 * Class to represent a grid.
 * Contains two columns and two rows.
 * The first and last columns have their rows merged.
 */
export class GridLayout {
  private node: HTMLDivElement;

  private content: HTMLDivElement;

  constructor() {
    this.createNode();
    this.createContent();
    this.applyStyles();
  }

  public getNode(): HTMLDivElement {
    return this.node;
  }

  public populate(children: GridChildren): void {
    this.node.appendChild(children.leftButton);

    this.content.appendChild(children.topContent);
    this.content.appendChild(children.bottomContent);
    this.node.appendChild(this.content);

    this.node.appendChild(children.rightButton);
  }

  private applyStyles() {
    this.node.style.margin = '1em 0';
  }

  private createNode() {
    this.node = document.createElement('div');
    this.node.classList.add('grid');
    this.node.style.display = 'grid';
    this.node.style.alignItems = 'center';
    this.node.style.gridGap = '1em';
    this.node.style.gridTemplateColumns = '54px 1fr 54px';
  }

  private createContent() {
    this.content = document.createElement('div');
    this.content.style.display = 'flex';
    this.content.style.height = '100%';
    this.content.style.justifyContent = 'space-around';
    this.content.style.flexDirection = 'column';
  }
}
