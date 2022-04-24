import {TrackView} from '../views/track.view';
import {BandcampTrackParser} from '../common/bandcamp-track-parser';
import {KeyboardController} from './keyboard.controller';

export class TrackController {
  public view: TrackView;

  private anchor: HTMLAnchorElement;

  private href: string;

  private meta: BandcampTrackParser;

  private isLoading = false;

  private isReady = false;

  private isError = false;

  private isWishlisted: boolean;

  constructor(node: HTMLTableRowElement) {
    this.view = new TrackView(node);
    this.anchor = this.view.node.querySelector('.title a');
    this.href = this.anchor.href;

    this.setHoverEvents();
    this.setClickEvents();
  }

  public async updateVisibility(): Promise<void> {
    if (this.view.isPlaying) {
      this.view.show();
    } else {
      this.view.hide();
    }

    if (!this.isReady && this.view.isPlaying) {
      await this.load();
    }

    if (this.view.isPlaying) {
      KeyboardController.setCurrentTrack(this);
    }
  }

  private async toggleWishlist(): Promise<boolean> {
    try {
      const host = window.location.host;
      const endpoint = this.isWishlisted ? 'uncollect_item_cb' : 'collect_item_cb';
      const body = this.isWishlisted ? this.meta.uncollect : this.meta.collect;

      const request = await fetch(
        `https://${host}/${endpoint}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body,
        },
      );

      const response = await request.json();

      return response.ok === true;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return false;
    }
  }

  private render(): void {
    if (this.isLoading) {
      this.view.renderLoading();
    } else if (this.isWishlisted) {
      this.view.renderLike();
    } else {
      this.view.renderDislike();
    }

    if (this.isError) {
      this.view.renderError();
      this.isError = false;
    }
  }

  private async load() {
    if (!this.isLoading && !this.isReady) {
      this.isLoading = true;
      this.render();

      await this.loadMeta();
      this.validateMeta();

      this.isLoading = false;
      this.isReady = true;
      this.render();
    }
  }

  private setHoverEvents() {
    this.view.container.onmouseenter = async () => {
      this.view.render(true);
      await this.load();
    };

    this.view.container.onmouseleave = () => this.view.render();
  }

  private setClickEvents() {
    this.view.container.onclick = async () => {
      if (!this.isReady) {
        return;
      }

      this.isLoading = true;
      this.render();

      const hasToggled = await this.toggleWishlist();

      if (hasToggled) {
        this.isWishlisted = !this.isWishlisted;
      } else {
        this.isError = true;
      }

      this.isLoading = false;
      this.render();
    };
  }

  private async loadMeta() {
    if (!this.href) {
      throw new Error('No href found');
    }

    const response = await fetch(this.href);
    const html = await response.text();
    const parser = new DOMParser();
    const document = parser.parseFromString(html, 'text/html');

    this.meta = new BandcampTrackParser(document);
    this.isWishlisted = this.meta.is_wishlisted;
  }

  private validateMeta() {
    if (
      typeof this.meta.is_wishlisted !== 'undefined'
      && typeof this.meta.fan_id !== 'undefined'
      && typeof this.meta.band_id !== 'undefined'
      && typeof this.meta.item_id !== 'undefined'
      && typeof this.meta.item_type !== 'undefined'
      && typeof this.meta.data_referrer_token !== 'undefined'
      && typeof this.meta.collect !== 'undefined'
      && typeof this.meta.uncollect !== 'undefined'
    ) {
      return;
    }

    throw new Error('Meta data is not valid');
  }
}
