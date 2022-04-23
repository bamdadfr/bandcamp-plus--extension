import {CopyInfoController} from './copy-info.controller';
import {BandcampFacade} from '../facades/bandcamp.facade';
import {VolumeController} from './volume.controller';

type Keys =
  'Space'
  | 'KeyC'
  | 'KeyP'
  | 'KeyN'
  | 'KeyZ'
  | 'ArrowUp'
  | 'ArrowDown'
  | 'ArrowLeft'
  | 'ArrowRight'

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
      Space: true,
      ArrowLeft: true,
      ArrowRight: true,
      ArrowDown: true,
      ArrowUp: true,
    };
  }

  private static setEventsWithShift() {
    this.eventsWithShift = {
      KeyP: () => BandcampFacade.playFirstTrack(),
      ArrowLeft: () => BandcampFacade.seekReset(),
    };
  }

  private static setEvents() {
    this.events = {
      KeyC: () => this.controllers.copyInfo.handleClick(),
      Space: () => BandcampFacade.getPlay().click(),
      KeyP: () => BandcampFacade.getPrevious().click(),
      KeyN: () => BandcampFacade.getNext().click(),
      KeyZ: () => BandcampFacade.toggleWishlist(),
      ArrowRight: () => BandcampFacade.seekForward(),
      ArrowLeft: () => BandcampFacade.seekBackward(),
      ArrowUp: () => this.controllers.volume.increaseVolume(),
      ArrowDown: () => this.controllers.volume.decreaseVolume(),
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

      const code = e.code as Keys;
      const {shiftKey, ctrlKey, metaKey, altKey} = e;

      // ignore if key is not in events
      if (Object.keys(this.events).indexOf(code) === -1) {
        return;
      }

      // handle events with shift
      if (shiftKey && this.eventsWithShift[code]) {
        this.eventsWithShift[code]();
        return;
      }

      // handle events with no modifier
      if (this.events[code] && (!shiftKey && !ctrlKey && !metaKey && !altKey)) {
        if (this.eventsPreventing[code]) {
          e.preventDefault();
        }

        this.events[code]();
      }
    });
  }
}
