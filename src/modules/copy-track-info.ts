import {ButtonComponent} from '../components/button.component';
import {isPageTrack} from '../utils/is-page-track';
import {isPageAlbum} from '../utils/is-page-album';

/**
 * Module for track info.
 * Use to get artist and title information then copy to clipboard.
 */
export class CopyTrackInfo {
  private readonly node: ButtonComponent;

  constructor() {
    this.node = new ButtonComponent('Copy');
    this.handleClick();
  }

  /**
   * Copy track info to clipboard.
   */
  public static async copy(): Promise<void> {
    await navigator.clipboard.writeText(`${this.getArtist()} ${this.getTitle()}`);
  }

  /**
   * Get current artist.
   *
   * @returns {string} - Current artist.
   */
  private static getArtist(): string {
    const artist = document.getElementById('name-section').children[1].children[0] as HTMLSpanElement;
    return artist.innerText;
  }

  /**
   * Get title of the current track or the album.
   *
   * @returns {string} - Title of the current track or the album.
   */
  private static getTitle(): string {
    if (isPageTrack()) {
      const trackTitle = document.getElementsByClassName('trackTitle')[0] as HTMLTitleElement;
      return trackTitle.innerText;
    }

    if (isPageAlbum()) {
      const albumTitle = document.getElementsByClassName('title-section')[0] as HTMLSpanElement;
      return albumTitle.innerText;
    }
  }

  public getNode(): HTMLSpanElement {
    return this.node.getNode();
  }

  private handleClick() {
    this.node.onClick(
      'Copied!',
      () => {
        (async () => {
          await CopyTrackInfo.copy();
        })();
        return true;
      },
    );
  }
}
