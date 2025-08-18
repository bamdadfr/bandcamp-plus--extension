import {storage} from 'webextension-polyfill';

import {DEFAULT_SPEED, DEFAULT_VOLUME} from '../constants';

interface StateInterface {
  volume?: number;
  speed?: number;
}

export class State {
  static async init() {
    const prev = await State.get();

    if (typeof prev.volume === 'undefined') {
      await State.set('volume', DEFAULT_VOLUME);
    }

    if (typeof prev.speed === 'undefined') {
      await State.set('speed', DEFAULT_SPEED);
    }
  }

  static async get() {
    return (await storage.local.get()) as unknown as StateInterface;
  }

  static async set<K extends keyof StateInterface>(
    key: K,
    value: StateInterface[K],
  ) {
    await storage.local.set({
      [key]: value,
    });
  }
}
