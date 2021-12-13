/**
 * @param {object} options options
 * @param {number|string} options.value volume default value
 * @param {string} [options.id] HTML id
 * @returns {HTMLSpanElement} volume value
 */
export function SpanComponent({value, id = undefined}) {
  const span = document.createElement('span');
  span.innerText = value.toString();

  if (id) {
    span.id = id;
  }

  return span;
}
