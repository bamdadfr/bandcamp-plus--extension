import speedToPercentage from 'speed-to-percentage';
import speedToSemitones from 'speed-to-semitones';
import {GridComponent} from '../components/grid.component';
import {InputComponent} from '../components/input.component';
import {ButtonComponent} from '../components/button.component';
import {SpanComponent} from '../components/span.component';
import {Bandcamp} from './bandcamp';

export class Speed {
  // Default value
  private readonly value: number;

  private node: GridComponent;

  private button: ButtonComponent;

  private input: InputComponent;

  private labels: HTMLDivElement;

  private percentage: SpanComponent;

  private semitones: SpanComponent;

  constructor(value: number) {
    this.value = value;

    // children
    this.createButton();
    this.createPercentage();
    this.createSemitones();
    this.createInput();

    // parents
    this.createLabels();
    this.createNode();

    // events
    this.handlePlay();
    this.handleInput();
    this.handleButton();
  }

  private static getPercentageText(value: number): string {
    return speedToPercentage(value) + ' %';
  }

  private static getSemitonesText(value: number): string {
    return speedToSemitones(value, 1) + ' st';
  }

  public getNode(): HTMLDivElement {
    return this.node.getNode();
  }

  private createLabels() {
    this.labels = document.createElement('div');
    this.labels.appendChild(this.percentage.getNode());
    this.labels.appendChild(this.semitones.getNode());
    this.labels.style.display = 'flex';
    this.labels.style.width = '250px';
    this.labels.style.justifyContent = 'space-between';
    this.labels.style.transform = 'translateY(4px)';
  }

  private createNode() {
    this.node = new GridComponent();
    this.node.getNode().style.margin = '1em 0';

    this.node.populate({
      first: this.button.getNode(),
      second: this.labels,
      third: this.input.getNode(),
    });
  }

  private createButton() {
    this.button = new ButtonComponent('Speed');
  }

  private createPercentage() {
    this.percentage = new SpanComponent({
      text: Speed.getPercentageText(this.value),
    });
  }

  private createInput() {
    this.input = new InputComponent({
      value: this.value,
      min: 0.5,
      max: 1.5,
      step: 0.005,
    });
  }

  private createSemitones() {
    this.semitones = new SpanComponent({
      text: Speed.getSemitonesText(this.value),
    });
  }

  private handlePlay() {
    const audio = Bandcamp.getAudio();

    audio.onplay = () => {
      const speed = parseFloat(this.input.getNode().value);
      Bandcamp.setSpeed(speed);
    };
  }

  private handleInput() {
    this.input.onInput((e) => {
      const target = e.target as HTMLInputElement;
      const speed = parseFloat(target.value);
      Bandcamp.setSpeed(speed);
      this.percentage.update(Speed.getPercentageText(speed));
      this.semitones.update(Speed.getSemitonesText(speed));
    });
  }

  private handleButton() {
    this.button.onClick('Reset!', () => {
      const audio = Bandcamp.getAudio();
      if (audio.playbackRate === this.value) {
        return;
      }

      audio.playbackRate = this.value;
      this.input.resetValue();
      this.percentage.reset();
      this.semitones.reset();

      return true;
    });
  }
}
