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
  private events: Record<Keys, () => void>;

  private eventsPreventing: Partial<Record<Keys, boolean>>;

  private eventsWithShift: Partial<Record<Keys, () => void>>;

  private readonly modules: Modules;

  constructor(modules: Modules) {
    this.modules = modules;
    this.setEvents();
    this.setEventsWithShift();
    this.setEventsPreventing();
    this.handleKeyboard();
  }

  private setEventsPreventing() {
    this.eventsPreventing = {
      Space: true,
      ArrowLeft: true,
      ArrowRight: true,
      ArrowDown: true,
      ArrowUp: true,
    };
  }

  private setEventsWithShift() {
    this.eventsWithShift = {
      KeyP: () => Bandcamp.playFirstTrack(),
      ArrowLeft: () => Bandcamp.seekReset(),
    };
  }

  private setEvents() {
    this.events = {
      KeyC: async () => await TrackInfo.copy(),
      Space: () => Bandcamp.getPlay().click(),
      KeyP: () => Bandcamp.getPrevious().click(),
      KeyN: () => Bandcamp.getNext().click(),
      ArrowRight: () => Bandcamp.seekForward(),
      ArrowLeft: () => Bandcamp.seekBackward(),
      ArrowUp: () => this.modules.volume.increaseVolume(),
      ArrowDown: () => this.modules.volume.decreaseVolume(),
    };
  }

  private handleKeyboard() {
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
