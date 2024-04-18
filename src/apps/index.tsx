import PaintComponent from './Paint'
import ToFComponent from './ToF'
import { WindowProps } from '../utils/types'

const Paint: WindowProps = {
    component: <PaintComponent />
}

const ToF: WindowProps = {
    component: <ToFComponent />
}

export {
    Paint,
    ToF
}