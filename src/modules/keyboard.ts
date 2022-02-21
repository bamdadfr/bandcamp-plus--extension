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
      if (!(e.target instanceof Element && e.target.tagName.toUpperCase() === 'BODY')) {
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
