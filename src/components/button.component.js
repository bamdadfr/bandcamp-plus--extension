import {COLORS} from '../constants';

/**
 * Component for a button.
 *
 * @param {*} options - Options for the button
 * @param {HTMLElement} options.child - Child element to be rendered inside the button
 * @param {Function} options.onClick - Function to be called when the button is clicked
 * @param {string} [options.width] - Width of the button
 * @param {string} [options.height] - Height of the button
 * @param {string} [options.color] - Color of the button
 * @param {string} [options.background] - Background color of the button
 * @param {string} [options.borderColor] - Border color of the button
 * @returns {HTMLSpanElement} copy track info button component
 */
export function ButtonComponent({
  child,
  onClick,
  width = '54px',
  height = '50px',
  color = COLORS.black,
  background = COLORS.white,
  borderColor = COLORS.gray,
}) {
  const button = document.createElement('span');
  button.style.display = 'flex';
  button.style.justifyContent = 'center';
  button.style.alignItems = 'center';

  button.style.width = width;
  button.style.height = height;

  button.style.fontWeight = 'bold';
  button.style.color = color;
  button.style.background = background;
  button.style.border = `1px solid ${borderColor}`;

  button.style.userSelect = 'none';
  button.style.cursor = 'pointer';

  button.appendChild(child);

  if (onClick) {
    button.addEventListener('click', onClick);
  }

  return button;
}
