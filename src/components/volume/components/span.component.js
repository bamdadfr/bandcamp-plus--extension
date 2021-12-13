/**
 * @param {object} options options
 * @param {number} options.defaultValue volume default value
 * @param {string} [options.id] HTML id
 * @returns {HTMLSpanElement} volume value
 */
export function SpanComponent({defaultValue, id = undefined}) {
  const span = document.createElement('span');
  span.innerText = defaultValue.toString();

  if (id) {
    span.id = id;
  }

  return span;
}
