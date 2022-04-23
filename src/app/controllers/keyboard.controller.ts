import {CopyInfoController} from './copy-info.controller';
import {BandcampFacade} from '../facades/bandcamp.facade';
import {VolumeController} from './volume.controller';

enum Keys {
  Space = ' ',
  C = 'C',
  P = 'P',
  N = 'N',
  W = 'W',
  ArrowUp = 'ARROWUP',
  ArrowDown = 'ARROWDOWN',
  ArrowLeft = 'ARROWLEFT',
  ArrowRight = 'ARROWRIGHT',
}

type Controllers = {
  volume: VolumeController;
  copyInfo: CopyInfoController;
}

export class KeyboardController {
  private static events: Record<Keys, () => void>;

  private static eventsPreventing: Partial<Record<Keys, boolean>>;

  private static eventsWithShift: Partial<Record<Keys, () => void>>;

  private static controllers: Controllers;

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
      [Keys.ArrowLeft]: () => BandcampFacade.seekReset(),
    };
  }

  private static setEvents() {
    this.events = {
      [Keys.C]: () => this.controllers.copyInfo.handleClick(),
      [Keys.Space]: () => BandcampFacade.getPlay().click(),
      [Keys.P]: () => BandcampFacade.getPrevious().click(),
      [Keys.N]: () => BandcampFacade.getNext().click(),
      [Keys.W]: () => BandcampFacade.toggleWishlist(),
      [Keys.ArrowRight]: () => BandcampFacade.seekForward(),
      [Keys.ArrowLeft]: () => BandcampFacade.seekBackward(),
      [Keys.ArrowUp]: () => this.controllers.volume.increaseVolume(),
      [Keys.ArrowDown]: () => this.controllers.volume.decreaseVolume(),
    };
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
