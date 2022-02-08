import {Volume} from './volume';
import {TrackInfo} from './track-info';
import {Bandcamp} from './bandcamp';

type Keys =
  'Space'
  | 'KeyC'
  | 'KeyP'
  | 'KeyN'
  | 'ArrowUp'
  | 'ArrowDown'
  | 'ArrowLeft'
  | 'ArrowRight'

type Modules = {
  volume: Volume;
}

export class Keyboard {
  private static events: Record<Keys, () => void>;

  private static eventsPreventing: Partial<Record<Keys, boolean>>;

  private static eventsWithShift: Partial<Record<Keys, () => void>>;

  private static modules: Modules;

  public static start(modules: Modules): void {
    this.modules = modules;
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
      KeyP: () => Bandcamp.playFirstTrack(),
      ArrowLeft: () => Bandcamp.seekReset(),
    };
  }

  private static setEvents() {
    this.events = {
      KeyC: async () => TrackInfo.copy(),
      Space: () => Bandcamp.getPlay().click(),
      KeyP: () => Bandcamp.getPrevious().click(),
      KeyN: () => Bandcamp.getNext().click(),
      ArrowRight: () => Bandcamp.seekForward(),
      ArrowLeft: () => Bandcamp.seekBackward(),
      ArrowUp: () => this.modules.volume.increaseVolume(),
      ArrowDown: () => this.modules.volume.decreaseVolume(),
    };
  }

  private static handleKeyboard() {
    document.addEventListener('keydown', (e) => {
      const code = e.code as Keys;
      const {shiftKey} = e;

      if (this.eventsPreventing[code]) {
        e.preventDefault();
      }

      if (shiftKey) {
        if (this.eventsWithShift[code]) {
          this.eventsWithShift[code]();
        }
      } else {
        if (this.events[code]) {
          this.events[code]();
        }
      }
    });
  }
}
