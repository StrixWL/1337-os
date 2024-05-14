import PaintComponent from './Paint'
import ToFComponent from './ToF'
import WinampComponent from './Winamp'
import { WindowProps } from '../utils/types'
import paintIcon from "../assets/paint.png"
import WinampIcon from "../assets/winamp.png"

// preloading img so that it immediately shows up when user opens a window
const img = new Image()
img.src = paintIcon
img.src = WinampIcon

const Paint: WindowProps = {
    Component: PaintComponent,
    icon: <img src={paintIcon} alt='Paint icon' />,
    title: "Untitled - Paint"
}

const ToF: WindowProps = {
    Component: ToFComponent,
    title: "Tower Of Fantasy Clone"
}

const Winamp: WindowProps = {
    Component: WinampComponent,
    title: "Winamp",
    icon: <img src={WinampIcon} alt='Winamp icon' />,
    removeHeader: true
}

export {
    Paint,
    ToF,
    Winamp
}