/**
 * Component for displaying a span element.
 *
 * @param {object} options - Component options
 * @param {number|string} options.value - Span value
 * @param {string} [options.id] - Span id
 * @returns {HTMLSpanElement} - Span element
 */
export function SpanComponent({value, id = undefined}) {
  const span = document.createElement('span');
  span.innerText = value.toString();

  if (id) {
    span.id = id;
  }

  return span;
}
