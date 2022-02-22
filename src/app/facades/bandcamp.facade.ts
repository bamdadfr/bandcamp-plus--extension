import {SEEK_STEP} from '../constants';
import {isPageTrack} from '../utils/is-page-track';
import {isPageAlbum} from '../utils/is-page-album';

/**
 * Class to handle the BandcampFacade module.
 */
export class BandcampFacade {
  private static audio: HTMLAudioElement;

  public static getTrackInfo(): string {
    let payload = '';

    const artist = document.getElementById('name-section').children[1].children[0] as HTMLSpanElement;
    payload += artist.innerText;

    if (isPageTrack()) {
      const trackTitle = document.getElementsByClassName('trackTitle')[0] as HTMLTitleElement;
      payload += ` ${trackTitle.innerText}`;
      return payload;
    }

    if (isPageAlbum()) {
      const albumTitle = document.getElementsByClassName('title-section')[0] as HTMLSpanElement;
      payload += ` ${albumTitle.innerText}`;
      return payload;
    }
  }

  public static getPlayer(): HTMLDivElement {
    return document.getElementsByClassName('inline_player')[0] as HTMLDivElement;
  }

  public static getAudio(): HTMLAudioElement {
    if (typeof this.audio === 'undefined') {
      this.audio = document.getElementsByTagName('audio')[0];
    }

    return this.audio;
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

  public static getTracks(): HTMLTableElement {
    return document.getElementById('track_table') as HTMLTableElement;
  }

  public static seekReset(): void {
    const audio = BandcampFacade.getAudio();
    audio.currentTime = 0;
  }

  public static seekForward(): void {
    const audio = BandcampFacade.getAudio();
    audio.currentTime += SEEK_STEP;
  }

  public static seekBackward(): void {
    const audio = BandcampFacade.getAudio();
    audio.currentTime -= SEEK_STEP;
  }

  public static setSpeed(speed: number): void {
    const audio = BandcampFacade.getAudio();

    if (audio.playbackRate !== speed) {
      audio.playbackRate = speed;
    }
  }

  public static setStretch(isStretch: boolean): void {
    const audio = BandcampFacade.getAudio();

    if (typeof audio.mozPreservesPitch !== 'undefined') {
      audio.mozPreservesPitch = isStretch;
      return;
    }

    audio.preservesPitch = isStretch;
  }

  public static setVolume(volume: number): void {
    const audio = BandcampFacade.getAudio();

    if (audio.volume !== volume) {
      audio.volume = volume;
    }
  }

  public static insertBelowPlayer(element: HTMLElement): void {
    const player = BandcampFacade.getPlayer();
    player.insertAdjacentElement('afterend', element);
  }

  public static movePlaylist(): void {
    const player = BandcampFacade.getPlayer();
    const tracks = BandcampFacade.getTracks();
    player.insertAdjacentElement('afterend', tracks);
  }

  public static playFirstTrack(): void {
    const tracks = BandcampFacade.getTracks();

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

  public static rectifyMargins(): void {
    const player = BandcampFacade.getPlayer();
    const tracks = BandcampFacade.getTracks();

    player.style.marginBottom = '1em';
    tracks.style.marginTop = '1em';

    const prevCell = document.getElementsByClassName('prev_cell')[0] as HTMLTableCellElement;
    const nextCell = document.getElementsByClassName('next_cell')[0] as HTMLTableCellElement;

    prevCell.style.transform = 'translate(4px)';
    nextCell.style.transform = 'translate(4px)';
  }
}
