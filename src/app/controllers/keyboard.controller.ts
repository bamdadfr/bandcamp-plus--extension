import {BandcampFacade} from '../facades/bandcamp.facade';
import {TrackController} from './track.controller';
import {Controllers} from './page.controller';

enum Keys {
  Space = ' ',
  C = 'C',
  P = 'P',
  N = 'N',
  W = 'W',
  R = 'R',
  ArrowUp = 'ARROWUP',
  ArrowDown = 'ARROWDOWN',
  ArrowLeft = 'ARROWLEFT',
  ArrowRight = 'ARROWRIGHT',
}

export class KeyboardController {
  private static events: Record<Keys, () => void>;

  private static eventsPreventing: Partial<Record<Keys, boolean>>;

  private static eventsWithShift: Partial<Record<Keys, () => void>>;

  private static controllers: Controllers;

  private static currentTrack: TrackController;

  public static setCurrentTrack(track: TrackController): void {
    this.currentTrack = track;
  }

  public static start(controllers: Controllers): void {
    this.controllers = controllers;
    this.setEvents();
    this.setEventsWithShift();
    this.setEventsPreventing();
    this.handleKeyboard();
  }

  private static setEventsPreventing() {
    this.eventsPreventing = {
      [Keys.Space]: true,
      [Keys.ArrowLeft]: true,
      [Keys.ArrowRight]: true,
      [Keys.ArrowDown]: true,
      [Keys.ArrowUp]: true,
    };
  }

  private static setEventsWithShift() {
    this.eventsWithShift = {
      [Keys.P]: () => BandcampFacade.playFirstTrack(),
      [Keys.W]: () => this.toggleWishlistRelease(),
      [Keys.R]: () => this.controllers.speed.reset(),
      [Keys.ArrowLeft]: () => BandcampFacade.seekReset(),
      [Keys.ArrowUp]: () => this.controllers.speed.increase(),
      [Keys.ArrowDown]: () => this.controllers.speed.decrease(),
    };
  }

  private static setEvents() {
    this.events = {
      [Keys.C]: () => this.controllers.copyInfo.handleClick(),
      [Keys.Space]: () => BandcampFacade.getPlay().click(),
      [Keys.P]: () => BandcampFacade.getPrevious().click(),
      [Keys.N]: () => BandcampFacade.getNext().click(),
      [Keys.R]: () => this.controllers.volume.reset(),
      [Keys.W]: () => this.toggleWishlistTrack(),
      [Keys.ArrowRight]: () => BandcampFacade.seekForward(),
      [Keys.ArrowLeft]: () => BandcampFacade.seekBackward(),
      [Keys.ArrowUp]: () => this.controllers.volume.increase(),
      [Keys.ArrowDown]: () => this.controllers.volume.decrease(),
    };
  }

  private static toggleWishlistRelease() {
    BandcampFacade.toggleWishlist();
  }

  private static toggleWishlistTrack() {
    // fallback if current page is a track
    if (BandcampFacade.isTrack) {
      this.toggleWishlistRelease();
      return;
    }

    if (BandcampFacade.isAlbum && this.currentTrack) {
      this.currentTrack.click();
    }
  }

  private static isBody(target: EventTarget): boolean {
    return target instanceof Element && target.tagName.toUpperCase() === 'BODY';
  }

  private static handleKeyboard() {
    document.addEventListener('keydown', (e) => {
      if (!(this.isBody(e.target))) {
        return;
      }

      const key = e.key.toUpperCase() as Keys;
      const {shiftKey, ctrlKey, metaKey, altKey} = e;

      // ignore if key is not in events
      if (Object.keys(this.events).indexOf(key) === -1) {
        return;
      }

      // handle events with shift
      if (shiftKey && this.eventsWithShift[key]) {
        this.eventsWithShift[key]();
        return;
      }

      // handle events with no modifier
      if (this.events[key] && (!shiftKey && !ctrlKey && !metaKey && !altKey)) {
        if (this.eventsPreventing[key]) {
          e.preventDefault();
        }

        this.events[key]();
      }
    });
  }
}
