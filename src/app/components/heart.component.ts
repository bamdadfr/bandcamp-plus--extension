import {BandcampColors, BandcampFacade} from '../facades/bandcamp.facade';
import {convertHexToRgb} from '../utils/convert-hex-to-rgb';

export class HeartComponent {
  public node: HTMLButtonElement;

  private colors: BandcampColors;

  constructor() {
    this.node = document.createElement('button');
    this.colors = BandcampFacade.colors;
    this.addStyles();
    this.renderLoading();
  }

  public renderLoading(): void {
    this.addLoadingStyles();
    this.animateLoading();
  }

  public renderLike(): void {
    this.reset();
    this.addLikeStyles();
    this.animateLike();
  }

  public renderDislike(): void {
    this.reset();
    this.addDislikeStyles();
    this.animateDislike();
  }

  public renderError(): void {
    this.animateError();
  }

  // url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewbox='0 0 100 100'><path fill='%23de3618' d='M50,88.87 C76.67,70.46 90,53.9 90,39.17 C90,17.08 63.12,3.84 50,27.63 C38.875,3.85 10,17.08 10,39.17 C10,53.9 23.33,70.46 50,88.87 Z'/></svg>")
  private addLikeStyles() {
    this.node.style.backgroundImage = 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewbox=\'0 0 100 100\'><path fill=\'%23de3618\' stroke=\'%23' + this.colors.link_color + '\' stroke-width=\'5\' d=\'M50,88.87 C76.67,70.46 90,53.9 90,39.17 C90,17.08 63.12,3.84 50,27.63 C38.875,3.85 10,17.08 10,39.17 C10,53.9 23.33,70.46 50,88.87 Z\'/></svg>")';
  }

  // url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewbox='0 0 100 100'><path fill='none' stroke='%23666' stroke-width='5' d='M50,88.87 C76.67,70.46 90,53.9 90,39.17 C90,17.08 63.12,3.84 50,27.63 C38.875,3.85 10,17.08 10,39.17 C10,53.9 23.33,70.46 50,88.87 Z'/></svg>")
  private addDislikeStyles() {
    this.node.style.backgroundImage = 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewbox=\'0 0 100 100\'><path fill=\'none\' stroke=\'%23' + this.colors.link_color + '\' stroke-width=\'5\' d=\'M50,88.87 C76.67,70.46 90,53.9 90,39.17 C90,17.08 63.12,3.84 50,27.63 C38.875,3.85 10,17.08 10,39.17 C10,53.9 23.33,70.46 50,88.87 Z\'/></svg>")';
  }

  private reset() {
    this.node.style.borderColor = 'transparent';
    this.node.style.cursor = 'pointer';

    this.removeAnimations();
  }

  private addLoadingStyles() {
    this.node.style.backgroundImage = '';

    const {r, g, b} = convertHexToRgb(this.colors.link_color);
    this.node.style.borderColor = `rgba(${r}, ${g}, ${b}, 0.5)`;
    this.node.style.borderRightColor = 'transparent';
    this.node.style.borderTopColor = 'transparent';

    this.node.style.cursor = 'default';
  }

  private removeAnimations() {
    this.node.getAnimations().forEach((animation) => {
      animation.cancel();
    });
  }

  private animateLoading() {
    this.node.animate([
      {transform: 'rotate(0deg)'},
      {transform: 'rotate(360deg)'},
    ], {
      duration: 400,
      iterations: Infinity,
    });
  }

  private animateError() {
    this.node.animate([
      {transform: 'rotate(-45deg)', opacity: 1, offset: 0},
      {transform: 'rotate(45deg)', offset: 0.05},
      {transform: 'rotate(-45deg)', offset: 0.1},
      {transform: 'rotate(45deg)', offset: 0.15},
      {transform: 'rotate(-45deg)', offset: 0.2},
      {transform: 'rotate(45deg)', offset: 0.25},
      {transform: 'rotate(0deg)', offset: 0.3},
      {transform: 'rotate(0deg)', offset: 1},
    ], {
      duration: 900,
      easing: 'cubic-bezier(0.45, 0.05, 0.55, 0.95)',
      iterations: 1,
    });
  }

  private addStyles() {
    this.node.style.display = 'block';
    this.node.style.width = '1em';
    this.node.style.height = '1em';
    this.node.style.border = '1px solid transparent';
    this.node.style.borderRadius = '50%';
    this.node.style.background = 'transparent';
    this.node.style.cursor = 'pointer';
    this.node.style.position = 'absolute';
    this.node.style.transition = 'background-color 0.25s ease';
    this.node.style.overflow = 'hidden';

    this.node.style.backgroundPosition = 'center';
    this.node.style.backgroundRepeat = 'no-repeat';
    this.node.style.backgroundSize = 'contain';
  }

  private animateLike() {
    this.node.animate([
      {transform: 'scale(0)', opacity: 0, offset: 0},
      {transform: 'scale(1.25)', offset: 0.15},
      {transform: 'scale(0.95)', offset: 0.32},
      {transform: 'scale(1)', opacity: 1, offset: 0.5},
      {transform: 'scale(1)', opacity: 1, offset: 1},
    ], {
      duration: 1200,
      easing: 'cubic-bezier(0.45, 0.05, 0.55, 0.95)',
      iterations: 1,
    });
  }

  private animateDislike() {
    this.node.animate([
      {transform: 'scale(0)', opacity: 0, offset: 0},
      {transform: 'scale(1.1)', offset: 0.15},
      {transform: 'scale(0.98)', offset: 0.30},
      {transform: 'scale(1)', opacity: 1, offset: 0.45},
      {transform: 'scale(1)', opacity: 1, offset: 1},
    ], {
      duration: 1200,
      easing: 'cubic-bezier(0.45, 0.05, 0.55, 0.95)',
      iterations: 1,
    });
  }
}
