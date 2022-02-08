import {SEEK_STEP} from '../constants';

/**
 * Class to handle the Bandcamp module.
 */
export class Bandcamp {
  public static getPlayer(): HTMLDivElement {
    return document.getElementsByClassName('inline_player')[0] as HTMLDivElement;
  }

  public static getAudio(): HTMLAudioElement {
    return document.getElementsByTagName('audio')[0];
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
    const audio = Bandcamp.getAudio();
    audio.currentTime = 0;
  }

  public static seekForward(): void {
    const audio = Bandcamp.getAudio();
    audio.currentTime += SEEK_STEP;
  }

  public static seekBackward(): void {
    const audio = Bandcamp.getAudio();
    audio.currentTime -= SEEK_STEP;
  }

  public static setSpeed(speed: number): void {
    const audio = Bandcamp.getAudio();

    if (audio.mozPreservesPitch === true) {
      audio.mozPreservesPitch = false;
    }

    if (audio.playbackRate !== speed) {
      audio.playbackRate = speed;
    }
  }

  public static setVolume(volume: number): void {
    const audio = Bandcamp.getAudio();

    if (audio.volume !== volume) {
      audio.volume = volume;
    }
  }

  public static insertBelowPlayer(element: HTMLElement): void {
    const player = Bandcamp.getPlayer();
    player.insertAdjacentElement('afterend', element);
  }

  public static movePlaylist(): void {
    const player = Bandcamp.getPlayer();
    const tracks = Bandcamp.getTracks();
    player.insertAdjacentElement('afterend', tracks);
  }

  public static playFirstTrack(): void {
    const tracks = Bandcamp.getTracks();

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
    const player = Bandcamp.getPlayer();
    const tracks = Bandcamp.getTracks();

    player.style.marginBottom = '1em';
    tracks.style.marginTop = '1em';
  }
}
