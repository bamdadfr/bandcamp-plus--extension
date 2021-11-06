/**
 * @returns {object} object lookup for events preventing default behaviour
 */
export function getKeyboardEventsPreventing () {
  return {
    'Space': true,
    'ArrowLeft': true,
    'ArrowRight': true,
    'ArrowDown': true,
    'ArrowUp': true,
  };
}
