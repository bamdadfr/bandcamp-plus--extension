import speedToPercentage from 'speed-to-percentage';
import speedToSemitones from 'speed-to-semitones';
import {SpanComponent} from '../components/span.component';
import {DEFAULT_SPEED} from '../constants';
import {AbstractObserver} from '../common/abstract.observer';
import {SpeedController} from '../controllers/speed.controller';

export class SpeedLabelsView implements AbstractObserver {
  public node: HTMLDivElement;

  private percentage: SpanComponent;

  private semitones: SpanComponent;

  constructor() {
    this.node = SpeedLabelsView.createContainer();
    this.percentage = SpeedLabelsView.createPercentage();
    this.semitones = SpeedLabelsView.createSemitones();

    this.node.appendChild(this.percentage.getNode());
    this.node.appendChild(this.semitones.getNode());
  }

  private static createContainer() {
    const container = document.createElement('div');

    container.style.display = 'flex';
    container.style.width = '250px';
    container.style.justifyContent = 'space-between';
    container.style.transform = 'translateY(4px)';

    return container;
  }

  private static formatPercentageText(s: number) {
    return speedToPercentage(s) + ' %';
  }

  private static formatSemitonesText(s: number) {
    return speedToSemitones(s, 1) + ' st';
  }

  private static createPercentage() {
    return new SpanComponent(SpeedLabelsView.formatPercentageText(DEFAULT_SPEED));
  }

  private static createSemitones() {
    return new SpanComponent(SpeedLabelsView.formatSemitonesText(DEFAULT_SPEED));
  }

  public update(c: SpeedController): void {
    this.renderPercentage(c.speed);

    if (c.isStretch) {
      this.semitones.getNode().style.display = 'none';
    } else {
      this.semitones.getNode().style.display = 'block';
      this.renderSemitones(c.speed);
    }
  }

  private renderPercentage(speed: number) {
    this.percentage.render(SpeedLabelsView.formatPercentageText(speed));
  }

  private renderSemitones(speed: number) {
    this.semitones.render(SpeedLabelsView.formatSemitonesText(speed));
  }
}
