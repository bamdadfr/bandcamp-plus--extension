import {constrainValue} from './constrain-value';

/**
 * Transpose a value with its current scale to a new scale
 * Inspired from processing/p5.js source code.
 *
 * @see https://github.com/processing/p5.js/blob/master/src/math/calculation.js#L450
 * @param {number} n - The value to transpose
 * @param {number} start1 - The start of the current scale
 * @param {number} stop1 - The end of the current scale
 * @param {number} start2 - The start of the new scale
 * @param {number} stop2 - The end of the new scale
 * @param {boolean} [isClamp] - If true, the value will be clamped between start2 and stop2
 * @returns {number} The value transposed to the new scale
 */
export function mapRange(
  n: number,
  start1: number,
  stop1: number,
  start2: number,
  stop2: number,
  isClamp = false,
): number {
  if (typeof n !== 'number') {
    throw new Error('n is not a number');
  }
  if (typeof start1 !== 'number') {
    throw new Error('start1 is not a number');
  }
  if (typeof stop1 !== 'number') {
    throw new Error('stop1 is not a number');
  }
  if (typeof start2 !== 'number') {
    throw new Error('start2 is not a number');
  }
  if (typeof stop2 !== 'number') {
    throw new Error('stop2 is not a number');
  }

  const value = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;

  if (!isClamp) {
    return value;
  }

  if (start2 < stop2) {
    return constrainValue(value, start2, stop2);
  } else {
    return constrainValue(value, stop2, start2);
  }
}
