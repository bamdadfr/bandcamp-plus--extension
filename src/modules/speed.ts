import speedToPercentage from 'speed-to-percentage';
import speedToSemitones from 'speed-to-semitones';
import {GridComponent} from '../components/grid.component';
import {InputComponent} from '../components/input.component';
import {ButtonComponent} from '../components/button.component';
import {SpanComponent} from '../components/span.component';
import {Bandcamp} from './bandcamp';
import {TIMEOUT} from '../constants';

export class Speed {
  private node: GridComponent;

  private readonly defaultSpeed: number = 1;

  private speedDefaultText = 'Speed';

  private speedButton: ButtonComponent;

  private speedSlider: InputComponent;

  private sliderAndInfoContainer: HTMLDivElement;

  private percentageInfo: SpanComponent;

  private semitonesInfo: SpanComponent;

  private modeButton: ButtonComponent;

  constructor() {
    // elements
    this.speedButton = new ButtonComponent(this.speedDefaultText);
    this.speedSlider = this.createSpeedSlider();

    this.percentageInfo = this.createPercentageInfo();
    this.semitonesInfo = this.createSemitonesInfo();
    this.sliderAndInfoContainer = this.createLabels();

    this.modeButton = new ButtonComponent('Vinyl');

    // events
    this.handleBandcamp();
    this.handleSpeedButton();
    this.handleSpeedSlider();
    this.handleModeButton();

    // render
    this.node = new GridComponent();
    this.node.getNode().style.margin = '1em 0';

    this.node.populate({
      first: this.speedButton.getNode(),
      second: this.sliderAndInfoContainer,
      third: this.speedSlider.getNode(),
      last: this.modeButton.getNode(),
    });
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
    const container = document.createElement('div');

    container.style.display = 'flex';
    container.style.width = '250px';
    container.style.justifyContent = 'space-between';
    container.style.transform = 'translateY(4px)';

    container.appendChild(this.percentageInfo.getNode());
    container.appendChild(this.semitonesInfo.getNode());

    return container;
  }

  private createPercentageInfo() {
    return new SpanComponent({
      text: Speed.getPercentageText(this.defaultSpeed),
    });
  }

  private createSpeedSlider() {
    return new InputComponent({
      value: this.defaultSpeed,
      min: 0.5,
      max: 1.5,
      step: 0.005,
    });
  }

  private createSemitonesInfo() {
    return new SpanComponent({
      text: Speed.getSemitonesText(this.defaultSpeed),
    });
  }

  private handleBandcamp() {
    const audio = Bandcamp.getAudio();
    Bandcamp.setMode(false);

    audio.onplay = () => {
      const speed = parseFloat(this.speedSlider.getNode().value);
      Bandcamp.setSpeed(speed);
    };
  }

  private handleSpeedButton() {
    const node = this.speedButton.getNode();

    node.onclick = () => {
      const audio = Bandcamp.getAudio();

      if (audio.playbackRate === this.defaultSpeed) {
        return;
      }

      node.textContent = 'Reset!';
      audio.playbackRate = this.defaultSpeed;

      this.speedSlider.resetValue();
      this.percentageInfo.reset();
      this.semitonesInfo.reset();

      setTimeout(() => {
        node.textContent = this.speedDefaultText;
      }, TIMEOUT);
    };
  }

  private handleSpeedSlider() {
    this.speedSlider.getNode().oninput = (e) => {
      const target = e.target as HTMLInputElement;
      const speed = parseFloat(target.value);

      Bandcamp.setSpeed(speed);
      this.percentageInfo.update(Speed.getPercentageText(speed));
      this.semitonesInfo.update(Speed.getSemitonesText(speed));
    };
  }

  private handleModeButton() {
    const node = this.modeButton.getNode();

    node.onclick = () => {
      const audio = Bandcamp.getAudio();
      const isStretch = audio.mozPreservesPitch || audio.preservesPitch;

      Bandcamp.setMode(!isStretch);

      if (isStretch) {
        node.textContent = 'Vinyl';
        this.semitonesInfo.getNode().style.display = 'block';
      } else {
        node.textContent = 'Stretch';
        this.semitonesInfo.getNode().style.display = 'none';
      }
    };
  }
}
