import PaintComponent from './Paint'
import ToFComponent from './ToF'
import WinampComponent from './Winamp'
import CalculatorComponent from './Calculator'
import { WindowProps } from '../utils/types'
import paintIcon from "../assets/paint.png"
import WinampIcon from "../assets/winamp.png"
import CalculatorIcon from "../assets/calculator.png"

// preloading img so that it immediately shows up when user opens a window
const img = new Image()
img.src = paintIcon
img.src = WinampIcon
img.src = CalculatorIcon

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

const Calculator: WindowProps = {
    Component: CalculatorComponent,
    icon: <img src={CalculatorIcon} alt='Calculator icon' />,
    title: "Calculator",
    width: 300,
    height: 300,
    minHeight: 250,
    minWidth: 250
}

export {
    Paint,
    ToF,
    Winamp,
    Calculator
}