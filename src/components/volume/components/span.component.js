/**
 * @param {object} options options
 * @param {number} options.defaultValue volume default value
 * @returns {HTMLSpanElement} volume value
 */
export function SpanComponent ({ defaultValue }) {

    const span = document.createElement ('span')

    span.innerText = defaultValue

    return span

}