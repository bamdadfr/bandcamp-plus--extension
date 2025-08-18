import {AbstractSubject} from '../common/abstract.subject';
import {State} from '../common/state';
import {DEFAULT_VOLUME, VOLUME_STEP} from '../constants';
import {BandcampFacade} from '../facades/bandcamp.facade';
import {VolumeLabelView} from '../views/volume-label.view';
import {VolumeResetButtonView} from '../views/volume-reset-button.view';
import {VolumeSliderView} from '../views/volume-slider.view';

export class VolumeController extends AbstractSubject {
  public button = new VolumeResetButtonView();

  public slider = new VolumeSliderView();

  public label = new VolumeLabelView();

  public volume: number = DEFAULT_VOLUME;

  constructor() {
    super();
    State.get().then(({volume}) => this.setVolume(volume));
    this.button.node.onClick(this.handleButtonClick.bind(this));
    this.slider.node.onChange(this.handleSliderChange.bind(this));
    this.attach(this.slider);
    this.attach(this.label);
  }

  public handleButtonClick(): void {
    this.reset();
  }

  public handleSliderChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    const volume = parseFloat(target.value);

    this.setVolume(volume);
  }

  public increase(): void {
    this.setVolume(this.volume + VOLUME_STEP);
  }

  public decrease(): void {
    this.setVolume(this.volume - VOLUME_STEP);
  }

  public reset(): void {
    if (BandcampFacade.audio.volume === DEFAULT_VOLUME) {
      return;
    }

    this.setVolume(DEFAULT_VOLUME);
    this.button.renderClick();
  }

  private setVolume(v: number) {
    if (v === this.volume) {
      return;
    }

    let volume;

    if (v < 0) {
      volume = 0;
    } else if (v > 1) {
      volume = 1;
    } else {
      volume = v;
    }

    this.volume = volume;
    BandcampFacade.setVolume(this.volume);
    State.set('volume', this.volume).then();
    this.notify();
  }
}
