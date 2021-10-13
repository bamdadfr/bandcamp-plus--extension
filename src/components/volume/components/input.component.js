/**
 * @param {object} options options
 * @param {number} options.defaultValue volume default value
 * @returns {HTMLInputElement} volume slider
 */
export function inputComponent ({ defaultValue }) {

    const input = document.createElement ('input')

    input.type = 'range'

    input.min = '0'

    input.max = '1'

    input.step = '0.01'

    input.value = defaultValue

    return input

}