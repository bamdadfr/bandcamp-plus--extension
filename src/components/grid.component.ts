type Children = {
  first: HTMLSpanElement;
  second: HTMLSpanElement;
  third: HTMLInputElement;
}

/**
 * Class to represent a grid.
 * Contains two columns and two rows.
 * The first column has its rows merged.
 * Therefore, there are three areas in total.
 */
export class GridComponent {
  private node: HTMLDivElement;

  private rightCol: HTMLDivElement;

  constructor() {
    this.createNode();
    this.createRightColumnContainer();
  }

  public getNode(): HTMLDivElement {
    return this.node;
  }

  public populate(children: Children): void {
    this.node.appendChild(children.first);

    this.rightCol.appendChild(children.second);
    this.rightCol.appendChild(children.third);
    this.node.appendChild(this.rightCol);
  }

  private createNode() {
    this.node = document.createElement('div');
    this.node.classList.add('grid');
    this.node.style.display = 'grid';
    this.node.style.alignItems = 'center';
    this.node.style.gridGap = '1em';
    this.node.style.gridTemplateColumns = '54px 1fr';
  }

  private createRightColumnContainer() {
    this.rightCol = document.createElement('div');
    this.rightCol.style.display = 'flex';
    this.rightCol.style.height = '100%';
    this.rightCol.style.justifyContent = 'space-around';
    this.rightCol.style.flexDirection = 'column';
  }
}
