/**
 * @param {object} options options
 * @param {number} options.defaultValue volume default value
 * @param {string} [options.id] HTML id
 * @returns {HTMLInputElement} volume slider
 */
export function InputComponent ({ defaultValue, id = undefined }) {
  const input = document.createElement ('input');
  input.type = 'range';
  input.min = '0';
  input.max = '1';
  input.step = '0.01';
  input.value = defaultValue.toString ();

  if (id) {
    input.id = id;
  }

  return input;
}
