/**
 * @param {object} options options
 * @param {number} options.defaultValue default value
 * @param {string} [options.id] HTML id
 * @param {number} options.min min value
 * @param {number} options.max max value
 * @param {number} options.step step value
 * @returns {HTMLInputElement} slider
 */
export function InputComponent({
  defaultValue,
  id = undefined,
  min = 0,
  max = 1,
  step = 0.01,
}) {
  const input = document.createElement('input');
  input.type = 'range';
  input.min = min.toString();
  input.max = max.toString();
  input.step = step.toString();
  input.value = defaultValue.toString();

  if (id) {
    input.id = id;
  }

  return input;
}
