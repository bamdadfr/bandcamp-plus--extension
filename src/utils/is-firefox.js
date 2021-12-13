/**
 * @returns {boolean} true if the browser is Firefox
 */
export function isFirefox() {
  return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
}
