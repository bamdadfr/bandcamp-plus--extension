export type GridChildren = {
  first: HTMLSpanElement;
  second: HTMLSpanElement;
  third: HTMLInputElement;
  last: HTMLSpanElement;
}

/**
 * Class to represent a grid.
 * Contains two columns and two rows.
 * The first and last columns have their rows merged.
 */
export class GridComponent {
  private node: HTMLDivElement;

  private centerCol: HTMLDivElement;

  constructor() {
    this.createNode();
    this.createCenterColContainer();
  }

  public getNode(): HTMLDivElement {
    return this.node;
  }

  public populate(children: GridChildren): void {
    // first col
    this.node.appendChild(children.first);

    // second col
    this.centerCol.appendChild(children.second);
    this.centerCol.appendChild(children.third);
    this.node.appendChild(this.centerCol);

    // third col
    this.node.appendChild(children.last);
  }

  private createNode() {
    this.node = document.createElement('div');
    this.node.classList.add('grid');
    this.node.style.display = 'grid';
    this.node.style.alignItems = 'center';
    this.node.style.gridGap = '1em';
    this.node.style.gridTemplateColumns = '54px 1fr 54px';
  }

  private createCenterColContainer() {
    this.centerCol = document.createElement('div');
    this.centerCol.style.display = 'flex';
    this.centerCol.style.height = '100%';
    this.centerCol.style.justifyContent = 'space-around';
    this.centerCol.style.flexDirection = 'column';
  }
}
