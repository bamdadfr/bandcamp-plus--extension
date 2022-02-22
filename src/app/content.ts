import {isPageAlbum} from './utils/is-page-album';
import {isPageTrack} from './utils/is-page-track';
import {BandcampFacade} from './facades/bandcamp.facade';
import {VolumeController} from './controllers/volume.controller';
import {GridLayout} from './layouts/grid.layout';
import {SpeedController} from './controllers/speed.controller';
import {KeyboardController} from './controllers/keyboard.controller';
import {CopyInfoController} from './controllers/copy-info.controller';

window.addEventListener('load', () => {
  if (!(isPageAlbum() || isPageTrack())) {
    return;
  }

  if (isPageAlbum()) {
    BandcampFacade.movePlaylist();
  }

  const secondRow = new GridLayout();
  const speedController = new SpeedController();

  secondRow.populate({
    leftButton: speedController.resetButton.node.getNode(),
    topContent: speedController.labels.node,
    bottomContent: speedController.slider.node.getNode(),
    rightButton: speedController.stretchButton.node.getNode(),
  });

  BandcampFacade.insertBelowPlayer(secondRow.getNode());

  const firstRow = new GridLayout();
  const volumeController = new VolumeController();
  const copyInfoController = new CopyInfoController();

  firstRow.populate({
    leftButton: volumeController.button.node.getNode(),
    topContent: volumeController.label.node.getNode(),
    bottomContent: volumeController.slider.node.getNode(),
    rightButton: copyInfoController.button.node.getNode(),
  });

  BandcampFacade.insertBelowPlayer(firstRow.getNode());

  BandcampFacade.rectifyMargins();

  KeyboardController.start({
    volume: volumeController,
    copyInfo: copyInfoController,
  });
});
