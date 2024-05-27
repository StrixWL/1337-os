import PaintComponent from './Paint'
import ToFComponent from './ToF'
import WinampComponent from './Winamp'
import CalculatorComponent from './Calculator'
import MinesweeperComponent from './Minesweeper'
import { WindowProps } from '../utils/types'
import paintIcon from "../assets/paint.png"
import WinampIcon from "../assets/winamp.png"
import CalculatorIcon from "../assets/calculator.png"
import MinesweeperIcon from "../assets/minesweeper.png"

// preloading img so that it immediately shows up when user opens a window
const img = new Image()
img.src = paintIcon
img.src = WinampIcon
img.src = CalculatorIcon
img.src = MinesweeperIcon

const Paint: WindowProps = {
    Component: PaintComponent,
    icon: <img src={paintIcon} alt='Paint icon' />,
    title: "Untitled - Paint",
    unique: false
}

const ToF: WindowProps = {
    Component: ToFComponent,
    title: "Tower Of Fantasy Clone",
    unique: false,
}

const Winamp: WindowProps = {
    Component: WinampComponent,
    title: "Winamp",
    icon: <img src={WinampIcon} alt='Winamp icon' />,
    removeHeader: true,
    unique: true
}

const Calculator: WindowProps = {
    Component: CalculatorComponent,
    icon: <img src={CalculatorIcon} alt='Calculator icon' />,
    title: "Calculator",
    width: 300,
    height: 300,
    minHeight: 250,
    minWidth: 250,
    unique: false
}

const Minesweeper: WindowProps = {
    Component: MinesweeperComponent,
    icon: <img src={MinesweeperIcon} alt='Minesweeper icon' />,
    title: "Minesweeper",
    width: 278,
    height: 340,
    unique: false,
    resizable: false
}

export {
    Paint,
    ToF,
    Winamp,
    Calculator,
    Minesweeper
}