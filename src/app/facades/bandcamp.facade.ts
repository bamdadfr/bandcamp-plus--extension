import {SEEK_STEP} from '../constants';

export interface BandcampColors {
  bg_color: string;
  body_color: string;
  hd_ft_color: string;
  link_color: string;
  navbar_bg_color: string;
  secondary_text_color: string;
  text_color: string;
}

export interface BandcampData {
  fan_tralbum_data: {
    band_id: number;
    fan_id: number;
    is_wishlisted: boolean;
  };
}

export enum BandcampWishlistState {
  NotLiked = 'wishlist',
  Liked = 'wishlisted',
}

/**
 * Class to handle the BandcampFacade module.
 */
export class BandcampFacade {
  private static _data: BandcampData;

  public static get data(): BandcampData {
    if (this._data) {
      return this._data;
    }

    const container = document.getElementById('pagedata');
    this._data = JSON.parse(container.dataset.blob);

    return this._data;
  }

  private static _isTrack: boolean;

  public static get isTrack(): boolean {
    if (this._isTrack) {
      return this._isTrack;
    }

    this._isTrack = /bandcamp.com\/track\//
      .exec(window.location.href)
      !== null;

    return this._isTrack;
  }

  private static _isAlbum: boolean;

  public static get isAlbum(): boolean {
    if (this._isAlbum) {
      return this._isAlbum;
    }

    this._isAlbum = /bandcamp.com\/album\//
      .exec(window.location.href)
      !== null;

    return this._isAlbum;
  }

  private static _colors: BandcampColors;

  public static get colors(): BandcampColors {
    if (this._colors) {
      return this._colors;
    }

    const data = document
      .getElementById('custom-design-rules-style')
      .getAttribute('data-design');

    this._colors = JSON.parse(data);

    return this._colors;
  }

  private static _audio: HTMLAudioElement;

  public static get audio(): HTMLAudioElement {
    if (this._audio) {
      return this._audio;
    }

    this._audio = document.getElementsByTagName('audio')[0];

    return this._audio;
  }

  public static get isPageSupported(): boolean {
    return BandcampFacade.isAlbum || BandcampFacade.isTrack;
  }

  public static get isLoggedIn(): boolean {
    return !document.getElementById('pagedata').getAttribute('data-blob').includes('"fan_tralbum_data":null');
  }

  public static get currentTrackContainer(): HTMLSpanElement {
    return document.querySelector('#trackInfo span.title');
  }

  public static get trackTable(): HTMLTableElement | null {
    return document.getElementById('track_table') as HTMLTableElement;
  }

  public static get tracks(): HTMLTableRowElement[] {
    const tracks = this.trackTable.querySelectorAll('tr');
    return Array.from(tracks);
  }

  public static get player(): HTMLDivElement {
    return document.getElementsByClassName('inline_player')[0] as HTMLDivElement;
  }

  public static get wishlistButton(): HTMLLIElement {
    return document.getElementById('collect-item') as HTMLLIElement;
  }

  public static getTrackInfo(): string {
    let payload = '';

    const artist = document.getElementById('name-section').children[1].children[0] as HTMLSpanElement;
    payload += artist.innerText;

    if (this.isTrack) {
      const trackTitle = document.getElementsByClassName('trackTitle')[0] as HTMLTitleElement;
      payload += ` ${trackTitle.innerText}`;
      return payload;
    }

    if (this.isAlbum) {
      const albumTitle = document.getElementsByClassName('title-section')[0] as HTMLSpanElement;
      payload += ` ${albumTitle.innerText}`;
      return payload;
    }
  }

  public static arrange(): void {
    this.movePlaylist();
    this.rectifyMargins();
  }

  public static getPlay(): HTMLDivElement {
    return document.getElementsByClassName('playbutton')[0] as HTMLDivElement;
  }

  public static getPrevious(): HTMLDivElement {
    return document.getElementsByClassName('prevbutton')[0] as HTMLDivElement;
  }

  public static getNext(): HTMLDivElement {
    return document.getElementsByClassName('nextbutton')[0] as HTMLDivElement;
  }

  public static seekReset(): void {
    this.audio.currentTime = 0;
  }

  public static seekForward(): void {
    this.audio.currentTime += SEEK_STEP;
  }

  public static seekBackward(): void {
    this.audio.currentTime -= SEEK_STEP;
  }

  public static setSpeed(speed: number): void {
    if (this.audio.playbackRate !== speed) {
      this.audio.playbackRate = speed;
    }
  }

  public static setStretch(isStretch: boolean): void {
    if (typeof this.audio.mozPreservesPitch !== 'undefined') {
      this.audio.mozPreservesPitch = isStretch;
      return;
    }

    this.audio.preservesPitch = isStretch;
  }

  public static setVolume(volume: number): void {
    if (this.audio.volume !== volume) {
      this.audio.volume = volume;
    }
  }

  public static insertBelowPlayer(element: HTMLElement): void {
    const player = BandcampFacade.player;
    player.insertAdjacentElement('afterend', element);
  }

  public static movePlaylist(): void {
    if (!this.isAlbum) {
      return;
    }

    const player = BandcampFacade.player;
    const tracks = BandcampFacade.trackTable;
    player.insertAdjacentElement('afterend', tracks);
  }

  public static playFirstTrack(): void {
    const tracks = BandcampFacade.trackTable;

    if (!tracks) {
      return;
    }

    const firstRow = tracks?.children[0]?.children[0] as HTMLTableRowElement;

    if (!firstRow) {
      return;
    }

    const firstPlayButton = firstRow?.children[0]?.children[0]?.children[0] as HTMLDivElement;

    if (!firstPlayButton) {
      return;
    }

    if (firstPlayButton.classList.contains('playing')) {
      return;
    }

    firstPlayButton.click();
  }

  public static toggleWishlist(): void {
    const {className} = this.wishlistButton;

    if (className === BandcampWishlistState.Liked) {
      const el = this.wishlistButton.children[1] as HTMLSpanElement;
      el.click();
    } else if (className === BandcampWishlistState.NotLiked) {
      const el = this.wishlistButton.firstElementChild as HTMLSpanElement;
      el.click();
    }
  }

  public static rectifyMargins(): void {
    const player = BandcampFacade.player;
    const tracks = BandcampFacade.trackTable;

    if (player) {
      player.style.marginBottom = '1em';
    }

    if (tracks) {
      tracks.style.marginTop = '1em';
    }

    const prevCell = document.getElementsByClassName('prev_cell')[0] as HTMLTableCellElement;
    const nextCell = document.getElementsByClassName('next_cell')[0] as HTMLTableCellElement;

    prevCell.style.transform = 'translate(4px)';
    nextCell.style.transform = 'translate(4px)';
  }
}
