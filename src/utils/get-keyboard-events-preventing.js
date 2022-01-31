/**
 * Utility to get the list of keyboard events preventing the default behavior.
 *
 * @returns {object} - The list of keyboard events preventing the default behavior.
 */
export function getKeyboardEventsPreventing() {
  return {
    Space: true,
    ArrowLeft: true,
    ArrowRight: true,
    ArrowDown: true,
    ArrowUp: true,
  };
}
