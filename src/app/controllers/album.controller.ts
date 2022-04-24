import {TrackController} from './track.controller';
import {
  BandcampFacade,
  BandcampWishlistState,
} from '../facades/bandcamp.facade';
import {observeElement} from '../utils/observe-element';

export class AlbumController {
  private tracks: TrackController[] = [];

  private isLiked = BandcampFacade.data.fan_tralbum_data.is_wishlisted;

  private button = BandcampFacade.wishlistButton;

  constructor() {
    if (!(BandcampFacade.isLoggedIn && BandcampFacade.isAlbum)) {
      return;
    }

    this.observeButton();
    this.addTracks();
    this.observeTracks();
  }

  /**
   * Observe the wishlist button and update the isLiked property.
   */
  private observeButton() {
    observeElement(this.button, () => {
      this.isLiked = this.button.className === BandcampWishlistState.Liked;
    });
  }

  private addTracks() {
    BandcampFacade.tracks.forEach((node) =>
      this.tracks.push(new TrackController(node, this)),
    );
  }

  private observeTracks() {
    observeElement(BandcampFacade.currentTrackContainer, () => {
      this.tracks.forEach(async (track) => {
        await track.updateVisibility();
      });
    });
  }
}
