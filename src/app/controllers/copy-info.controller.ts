import {CopyInfoButtonView} from '../views/copy-info-button.view';
import {BandcampFacade} from '../facades/bandcamp.facade';

export class CopyInfoController {
  public button: CopyInfoButtonView;

  constructor() {
    this.button = new CopyInfoButtonView();
    this.button.node.onClick(this.handleClick.bind(this));
  }

  public static async copy(): Promise<void> {
    await navigator.clipboard.writeText(BandcampFacade.getTrackInfo());
  }

  public handleClick(): void {
    (async () => {
      await CopyInfoController.copy();
      this.button.renderClick();
    })();
  }
}
