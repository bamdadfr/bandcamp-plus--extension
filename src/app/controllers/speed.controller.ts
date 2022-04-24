import {SpeedResetButtonView} from '../views/speed-reset-button.view';
import {AbstractSubject} from '../common/abstract.subject';
import {DEFAULT_SPEED, DEFAULT_STRETCH, SPEED_STEP} from '../constants';
import {BandcampFacade} from '../facades/bandcamp.facade';
import {SpeedSliderView} from '../views/speed-slider.view';
import {SpeedLabelsView} from '../views/speed-labels.view';
import {SpeedStretchButtonView} from '../views/speed-stretch-button.view';

export class SpeedController extends AbstractSubject {
  public resetButton = new SpeedResetButtonView();

  public slider = new SpeedSliderView();

  public labels = new SpeedLabelsView();

  public stretchButton = new SpeedStretchButtonView();

  public speed = DEFAULT_SPEED;

  public isStretch: boolean;

  constructor() {
    super();
    this.resetButton.node.onClick(this.handleButtonClick.bind(this));

    this.attach(this.labels);

    this.slider.node.onChange(this.handleSliderChange.bind(this));
    this.attach(this.slider);

    this.stretchButton.node.onClick(this.handleStretchButtonClick.bind(this));
    this.attach(this.stretchButton);

    this.initializePlayer();
  }

  public increase(): void {
    this.setSpeed(this.speed + SPEED_STEP);
  }

  public decrease(): void {
    this.setSpeed(this.speed - SPEED_STEP);
  }

  public reset(): void {
    if (BandcampFacade.audio.playbackRate === DEFAULT_SPEED) {
      return;
    }

    this.setSpeed(DEFAULT_SPEED);
    this.resetButton.renderClick();
  }

  public handleButtonClick(): void {
    this.reset();
  }

  public handleSliderChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    const speed = parseFloat(target.value);

    this.setSpeed(speed);
  }

  public handleStretchButtonClick(): void {
    const audio = BandcampFacade.audio;
    const isStretch = audio.mozPreservesPitch || audio.preservesPitch;

    this.setStretch(!isStretch);
  }

  private initializePlayer() {
    // set default state
    this.setSpeed(DEFAULT_SPEED);
    this.setStretch(DEFAULT_STRETCH);

    // set the speed whenever the play event is triggered
    const audio = BandcampFacade.audio;
    audio.onplay = () => {
      BandcampFacade.setSpeed(this.speed);
      BandcampFacade.setStretch(this.isStretch);
    };
  }

  private setStretch(isStretch: boolean) {
    if (isStretch === this.isStretch) {
      return;
    }

    this.isStretch = isStretch;
    BandcampFacade.setStretch(isStretch);
    this.notify();
  }

  private setSpeed(speed: number) {
    if (speed === this.speed) {
      return;
    }

    this.speed = speed;
    BandcampFacade.setSpeed(this.speed);
    this.notify();
  }
}
