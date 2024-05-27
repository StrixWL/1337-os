import PaintComponent from './Paint'
import ToFComponent from './ToF'
import WinampComponent from './Winamp'
import CalculatorComponent from './Calculator'
import MinesweeperComponent from './Minesweeper'
import { WindowProps } from '../utils/types'
import paintIcon from "../assets/paint.png"
import TofIcon from "../assets/tof.png"
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
    iconUrl: paintIcon,
    title: "Untitled - Paint",
    name: 'Paint',
    unique: false
}

const ToF: WindowProps = {
    Component: ToFComponent,
    title: "Tower Of Fantasy Clone",
    iconUrl: TofIcon,
    name: "Tower Of Fantasy",
    unique: false,
}

const Winamp: WindowProps = {
    Component: WinampComponent,
    title: "Winamp",
    name: "Winamp",
    iconUrl: WinampIcon,
    removeHeader: true,
    unique: true
}

const Calculator: WindowProps = {
    Component: CalculatorComponent,
    iconUrl: CalculatorIcon,
    title: "Calculator",
    name: "Calculator",
    width: 300,
    height: 300,
    minHeight: 250,
    minWidth: 250,
    unique: false
}

const Minesweeper: WindowProps = {
    Component: MinesweeperComponent,
    iconUrl: MinesweeperIcon,
    title: "Minesweeper",
    name: "Minesweeper",
    width: 278,
    height: 340,
    unique: false,
    resizable: false
}

const Apps = {
	"PAINT": Paint,
	"TOF": ToF,
	"WINAMP": Winamp,
	"CALCULATOR": Calculator,
	"MINESWEEPER": Minesweeper
}

export default Apps
