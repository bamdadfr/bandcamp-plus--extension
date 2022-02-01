import {GridComponent} from '../components/grid.component';
import {VOLUME_LABEL_ID, VOLUME_STEP} from '../constants';
import {InputComponent} from '../components/input.component';
import {ButtonComponent} from '../components/button.component';
import {SpanComponent} from '../components/span.component';
import {Bandcamp} from './bandcamp';

export class Volume {
  private readonly value: number;

  private button: ButtonComponent;

  private label: SpanComponent;

  private slider: InputComponent;

  private node: GridComponent;

  constructor(value: number) {
    this.value = value;

    // elements
    this.createButton();
    this.createLabel();
    this.createSlider();

    // parent
    this.createNode();

    // events
    this.handleButton();
    this.handleSlider();
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

  private createNode() {
    this.node = new GridComponent();
    this.node.getNode().style.margin = '1em 0';

    this.node.populate({
      first: this.button.getNode(),
      second: this.label.getNode(),
      third: this.slider.getNode(),
    });
  }

  private createButton() {
    this.button = new ButtonComponent('Volume');
  }

  private createLabel() {
    const text = Volume.getLabelText(this.value);

    this.label = new SpanComponent({
      text,
      id: VOLUME_LABEL_ID,
    });

    this.label.getNode().style.transform = 'translateY(4px)';
  }

  private createSlider() {
    this.slider = new InputComponent({
      id: VOLUME_LABEL_ID,
      value: this.value,
    });
  }

  private updateVolume(increase: boolean): void {
    let volume = parseFloat(this.slider.getNode().value);

    if (increase) {
      volume += VOLUME_STEP;
    } else {
      volume -= VOLUME_STEP;
    }

    this.label.update(Volume.getLabelText(volume));
    this.slider.updateValue(volume);
  }

  private handleButton() {
    this.button.onClick('Reset!', () => {
      Bandcamp.setVolume(this.value);

      this.label.reset();
      this.slider.resetValue();
      this.slider.getNode().style.setProperty('--ratio', this.value.toString());

      return true;
    });
  }

  private handleSlider() {
    this.slider.onInput((e) => {
      const target = e.target as HTMLInputElement;
      const volume = parseFloat(target.value);

      Bandcamp.setVolume(volume);
      this.label.update(Volume.getLabelText(volume));
      this.slider.getNode().style.setProperty('--ratio', volume.toString());
    });
  }
}
