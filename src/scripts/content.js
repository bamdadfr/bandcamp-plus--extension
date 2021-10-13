import { moveTrackList } from '../features/move-tracklist'
import { addVolumeSlider } from '../features/add-volume-slider'
import { copyTrackInfo } from '../features/copy-track-info'
import { handleKeyboard } from '../features/handle-keyboard'

window.addEventListener ('load', () => {

    moveTrackList ()

    addVolumeSlider ()

    copyTrackInfo ()

    handleKeyboard ()

})