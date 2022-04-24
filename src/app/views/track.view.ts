import {HeartComponent} from '../components/heart.component';

export class TrackView {
  public node: HTMLTableRowElement;

  public container: HTMLTableCellElement;

  private icon: HeartComponent;

  constructor(node: HTMLTableRowElement) {
    this.node = node;
    this.createIcon();
    this.render();
  }

  public get isPlaying(): boolean {
    return this.node.className.includes('current_track');
  }

  public render(hover = false): void {
    if (!hover && !this.isPlaying) {
      this.hide();
      return;
    }

    this.show();
  }

  public renderError(): void {
    this.icon.renderError();
  }

  public renderLoading(): void {
    this.icon.renderLoading();
  }

  public renderLike(): void {
    this.icon.renderLike();
  }

  public renderDislike(): void {
    this.icon.renderDislike();
  }

  public show(): void {
    this.container.style.visibility = 'visible';
  }

  public hide(): void {
    this.container.style.visibility = 'hidden';
  }

  private createIcon() {
    this.container = document.createElement('td');

    const container = document.createElement('div');
    this.icon = new HeartComponent();

    container.appendChild(this.icon.node);
    this.container.appendChild(container);

    this.container.style.transform = 'translate3d(0,-2px,0)';

    this.node.insertBefore(this.container, this.node.lastElementChild);
  }
}
