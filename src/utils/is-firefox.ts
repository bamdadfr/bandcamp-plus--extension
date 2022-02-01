/**
 * Utility function to check if the browser is Firefox.
 *
 * @returns {boolean}
 *    True if the browser is Firefox, false otherwise.
 */
export function isFirefox(): boolean {
  return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
}
