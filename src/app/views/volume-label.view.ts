import {SpanComponent} from '../components/span.component';
import {DEFAULT_VOLUME} from '../constants';
import {AbstractObserver} from '../common/abstract.observer';
import {VolumeController} from '../controllers/volume.controller';

export class VolumeLabelView implements AbstractObserver {
  public node: SpanComponent;

  constructor() {
    this.node = VolumeLabelView.createLabel();
    this.applyStyles();
  }

  private static renderText(v: number): string {
    return (v * 100).toFixed(0) + '%';
  }

  private static createLabel() {
    return new SpanComponent(VolumeLabelView.renderText(DEFAULT_VOLUME));
  }

  public update(c: VolumeController): void {
    this.node.render(VolumeLabelView.renderText(c.volume));
  }

  private applyStyles() {
    this.node.getNode().style.transform = 'translateY(4px)';
  }
}
