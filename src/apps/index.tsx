import PaintComponent from './Paint'
import ToFComponent from './ToF'
import { WindowProps } from '../utils/types'
import paintIcon from "../assets/paint.png"

// preloading img so that it immediately shows up when user opens a window
const img = new Image()
img.src = paintIcon

const Paint: WindowProps = {
    component: <PaintComponent />,
    icon: <img src={paintIcon} alt='Paint icon' />,
    title: "Untitled - Paint"
}

const ToF: WindowProps = {
    component: <ToFComponent />,
    title: "Tower Of Fantasy Clone"
}

export {
    Paint,
    ToF
}