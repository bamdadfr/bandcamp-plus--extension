import {HeartComponent} from '../components/heart.component';

export class TrackView {
  public node: HTMLTableRowElement;

  public container: HTMLDivElement;

  private icon: HeartComponent;

  private target: HTMLTableRowElement;

  private infoLink: HTMLDivElement;

  constructor(node: HTMLTableRowElement) {
    this.node = node;
    this.target = this.node.querySelector('.info-col');
    this.infoLink = this.target.querySelector('.info_link');

    this.applyTargetStyles();

    this.createIcon();
    this.applyIconStyles();

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
    this.container = document.createElement('div');
    this.icon = new HeartComponent();

    this.container.appendChild(this.icon.node);

    this.target.insertBefore(this.container, this.target.lastElementChild);
  }

  private applyTargetStyles() {
    this.infoLink.style.visibility = 'hidden';
  }

  private applyIconStyles() {
    this.container.tabIndex = -1;
    this.container.style.transform = 'translate3d(20px,-2px,0)';
  }
}
