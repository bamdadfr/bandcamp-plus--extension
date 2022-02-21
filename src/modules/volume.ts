import {GridComponent} from '../components/grid.component';
import {VOLUME_STEP} from '../constants';
import {InputComponent} from '../components/input.component';
import {ButtonComponent} from '../components/button.component';
import {SpanComponent} from '../components/span.component';
import {Bandcamp} from './bandcamp';
import {CopyTrackInfo} from './copy-track-info';

export class Volume {
  private node: GridComponent;

  private readonly defaultVolume: number = 0.7;

  private volumeButton: ButtonComponent;

  private volumeInfo: SpanComponent;

  private volumeSlider: InputComponent;

  private copyButton: CopyTrackInfo;

  constructor() {
    this.createVolumeButton();
    this.createVolumeInfo();
    this.createVolumeSlider();
    this.createCopyButton();

    this.handleVolumeButton();
    this.handleVolumeSlider();

    this.render();
  }

  private static getLabelText(value: number): string {
    return (value * 100).toFixed(0) + '%';
  }

  public getNode(): HTMLDivElement {
    return this.node.getNode();
  }

  public increaseVolume(): void {
    this.updateVolume(true);
  }

  public decreaseVolume(): void {
    this.updateVolume(false);
  }

  private render() {
    this.node = new GridComponent();
    this.node.getNode().style.margin = '1em 0';

    this.node.populate({
      first: this.volumeButton.getNode(),
      second: this.volumeInfo.getNode(),
      third: this.volumeSlider.getNode(),
      last: this.copyButton.getNode(),
    });
  }

  private createVolumeButton() {
    this.volumeButton = new ButtonComponent('Volume');
  }

  private createVolumeInfo() {
    const text = Volume.getLabelText(this.defaultVolume);

    this.volumeInfo = new SpanComponent({
      text,
    });

    this.volumeInfo.getNode().style.transform = 'translateY(4px)';
  }

  private createVolumeSlider() {
    this.volumeSlider = new InputComponent({
      value: this.defaultVolume,
    });
  }

  private updateVolume(increase: boolean): void {
    let volume = parseFloat(this.volumeSlider.getNode().value);

    if (increase) {
      volume += VOLUME_STEP;
    } else {
      volume -= VOLUME_STEP;
    }

    this.volumeInfo.update(Volume.getLabelText(volume));
    this.volumeSlider.updateValue(volume);
  }

  private handleVolumeButton() {
    this.volumeButton.onClick('Reset!', () => {
      const audio = Bandcamp.getAudio();
      if (audio.volume === this.defaultVolume) {
        return;
      }

      Bandcamp.setVolume(this.defaultVolume);

      this.volumeInfo.reset();
      this.volumeSlider.resetValue();
      this.volumeSlider.getNode().style.setProperty('--ratio', this.defaultVolume.toString());

      return true;
    });
  }

  private handleVolumeSlider() {
    this.volumeSlider.onInput((e) => {
      const target = e.target as HTMLInputElement;
      const volume = parseFloat(target.value);

      Bandcamp.setVolume(volume);
      this.volumeInfo.update(Volume.getLabelText(volume));
      this.volumeSlider.getNode().style.setProperty('--ratio', volume.toString());
    });
  }

  private createCopyButton() {
    this.copyButton = new CopyTrackInfo();
  }
}
