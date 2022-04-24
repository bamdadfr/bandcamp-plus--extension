import {BandcampFacade} from '../facades/bandcamp.facade';
import {GridLayout} from '../layouts/grid.layout';
import {SpeedController} from './speed.controller';
import {VolumeController} from './volume.controller';
import {CopyInfoController} from './copy-info.controller';
import {AlbumController} from './album.controller';
import {KeyboardController} from './keyboard.controller';

export interface Controllers {
  speed: SpeedController;
  volume: VolumeController;
  copyInfo: CopyInfoController;
  album: AlbumController;
}

export class PageController {
  private readonly controllers: Controllers;

  private constructor() {
    if (!BandcampFacade.isPageSupported) {
      return;
    }

    this.controllers = {
      speed: new SpeedController(),
      volume: new VolumeController(),
      copyInfo: new CopyInfoController(),
      album: new AlbumController(),
    };

    BandcampFacade.arrange();
    this.createRows();

    KeyboardController.start(this.controllers);
  }

  public static init(): PageController {
    return new PageController();
  }

  private createSpeedRow() {
    const grid = new GridLayout();

    grid.populate({
      leftButton: this.controllers.speed.resetButton.node.getNode(),
      topContent: this.controllers.speed.labels.node,
      bottomContent: this.controllers.speed.slider.node.getNode(),
      rightButton: this.controllers.speed.stretchButton.node.getNode(),
    });

    BandcampFacade.insertBelowPlayer(grid.getNode());
  }

  private createVolumeRow() {
    const container = new GridLayout();

    container.populate({
      leftButton: this.controllers.volume.button.node.getNode(),
      topContent: this.controllers.volume.label.node.getNode(),
      bottomContent: this.controllers.volume.slider.node.getNode(),
      rightButton: this.controllers.copyInfo.button.node.getNode(),
    });

    BandcampFacade.insertBelowPlayer(container.getNode());
  }

  private createRows() {
    this.createSpeedRow();
    this.createVolumeRow();
  }
}
