import PaintComponent from './Paint'
import WinampComponent from './Winamp'
import CalculatorComponent from './Calculator'
import MinesweeperComponent from './Minesweeper'
import ComputerComponent from './Computer'
import VirusComponent from './Virus'
import { WindowProps } from '../utils/types'
import paintIcon from "../assets/paint.png"
import WinampIcon from "../assets/winamp.png"
import CalculatorIcon from "../assets/calculator.png"
import ComputerIcon from "../assets/imac.png"
import MinesweeperIcon from "../assets/minesweeper.png"
import VirusIcon from "../assets/virus.png"

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
    width: 320,
    height: 390,
    minHeight: 320,
    minWidth: 260,
    unique: false
}

const Virus: WindowProps = {
    Component: VirusComponent,
    iconUrl: VirusIcon,
    title: "Virus",
    name: "Virus",
    width: 300,
    height: 300,
    minHeight: 260,
    minWidth: 260,
    unique: false
}

const Minesweeper: WindowProps = {
    Component: MinesweeperComponent,
    iconUrl: MinesweeperIcon,
    title: "Minesweeper",
    name: "Minesweeper",
    width: 284,
    height: 320,
    unique: false,
    resizable: false
}

const Computer: WindowProps = {
    Component: ComputerComponent,
    iconUrl: ComputerIcon,
    title: "1337 OS",
    name: "1337 OS",
    width: 300,
    height: 300,
    minHeight: 260,
    minWidth: 260,
    unique: false,
    maximized: true
}

const Apps = {
    "PAINT": Paint,
	"WINAMP": Winamp,
    "STRIXOS": Computer,
	"CALCULATOR": Calculator,
    "VIRUS": Virus,
	"MINESWEEPER": Minesweeper,
}

export default Apps
