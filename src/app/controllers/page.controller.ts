import {BandcampFacade} from '../facades/bandcamp.facade';
import {GridLayout} from '../layouts/grid.layout';
import {SpeedController} from './speed.controller';
import {VolumeController} from './volume.controller';
import {CopyInfoController} from './copy-info.controller';
import {KeyboardController} from './keyboard.controller';
import {TrackController} from './track.controller';

export class PageController {
  private speed: SpeedController;

  private readonly volume: VolumeController;

  private readonly copyInfo: CopyInfoController;

  private tracks: TrackController[] = [];

  private currentTrackSpan = document.querySelector('#trackInfo span.title');

  private constructor() {
    if (!(BandcampFacade.isAlbum || BandcampFacade.isTrack)) {
      return;
    }

    this.speed = new SpeedController();
    this.volume = new VolumeController();
    this.copyInfo = new CopyInfoController();

    if (BandcampFacade.isAlbum) {
      BandcampFacade.movePlaylist();
    }

    if (BandcampFacade.isAlbum && BandcampFacade.isLoggedIn) {
      this.addTracks();
      this.observeTracks();
    }

    this.initAll();
  }

  public static init(): PageController {
    return new PageController();
  }

  private addTracks() {
    const nodes = Array.from(BandcampFacade.getTracks().querySelectorAll('tr'));

    nodes.forEach((node) =>
      this.tracks.push(new TrackController(node)),
    );
  }

  private observeTracks() {
    const o = new MutationObserver(() => {
      this.tracks.forEach(async (track) => {
        await track.updateVisibility();
      });
    });

    o.observe(this.currentTrackSpan, {childList: true});
  }

  private createSpeedRow() {
    const grid = new GridLayout();

    grid.populate({
      leftButton: this.speed.resetButton.node.getNode(),
      topContent: this.speed.labels.node,
      bottomContent: this.speed.slider.node.getNode(),
      rightButton: this.speed.stretchButton.node.getNode(),
    });

    BandcampFacade.insertBelowPlayer(grid.getNode());
  }

  private createVolumeRow() {
    const container = new GridLayout();

    container.populate({
      leftButton: this.volume.button.node.getNode(),
      topContent: this.volume.label.node.getNode(),
      bottomContent: this.volume.slider.node.getNode(),
      rightButton: this.copyInfo.button.node.getNode(),
    });

    BandcampFacade.insertBelowPlayer(container.getNode());
  }

  private initAll() {
    this.createSpeedRow();
    this.createVolumeRow();

    BandcampFacade.rectifyMargins();

    KeyboardController.start({
      volume: this.volume,
      copyInfo: this.copyInfo,
    });
  }
}
