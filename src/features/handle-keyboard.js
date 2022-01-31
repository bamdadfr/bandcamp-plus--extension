import {getKeyboardEvents} from '../utils/get-keyboard-events';
import {
  getKeyboardEventsPreventing,
} from '../utils/get-keyboard-events-preventing';
import {
  getKeyboardEventsWithShift,
} from '../utils/get-keyboard-events-with-shift';

/**
 * Handle keyboard events.
 */
export function handleKeyboard() {
  const events = getKeyboardEvents();
  const eventsPreventing = getKeyboardEventsPreventing();
  const eventsWithShift = getKeyboardEventsWithShift();

  document.addEventListener('keydown', async (e) => {
    const {code, shiftKey} = e;

    if (eventsPreventing[code]) {
      e.preventDefault();
    }

    if (shiftKey) {
      if (eventsWithShift[code]) {
        eventsWithShift[code]();
      }
    } else {
      if (events[code]) {
        events[code]();
      }
    }
  });
}
