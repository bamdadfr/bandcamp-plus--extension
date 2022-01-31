/**
 * Component for input fields. Used for faders, sliders, etc.
 *
 * @param {object} options - Component options
 * @param {number} options.defaultValue - Default value
 * @param {string} [options.id] - Input id
 * @param {number} [options.min] - Minimum value
 * @param {number} [options.max] - Maximum value
 * @param {number} [options.step] - Step value
 * @returns {HTMLInputElement} - Input element
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
