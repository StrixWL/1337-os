import styles from './Window.module.scss';
import { MouseEvent, useEffect, useRef, useState } from 'react';

interface WindowProps {
    backgroundColor: string
}

const Window = ({ backgroundColor }: WindowProps) => {
    const [startDrag, setStartDrag] = useState({ x: 0, y: 0 })
    const [sizes, setSizes] = useState({ width: 200, height: 200, left: 300, top: 200 })
    const [prevSizes, setPrevSizes] = useState({ width: 200, height: 200, left: 300, top: 200 })
    const [isDragging, setIsDragging] = useState(false)
    const [cursor, setCursor] = useState('auto')
    const ref = useRef<HTMLDivElement>(null)

    const handleMouseMove = (event: globalThis.MouseEvent) => {
        if (!isDragging) {
            const boundingRect = ref.current!.getBoundingClientRect();
            const left = event.clientX - boundingRect.left;
            const top = event.clientY - boundingRect.top;
            const right = boundingRect.width - left
            const bottom = boundingRect.height - top
            const offset = 10

            if (top < offset && left < offset)
                setCursor('nw-resize');
            else if (bottom < offset && left < offset)
                setCursor('sw-resize');
            else if (bottom < offset && right < offset)
                setCursor('se-resize');
            else if (top < offset && right < offset)
                setCursor('ne-resize');
            else if (top < offset)
                setCursor('n-resize');
            else if (left < offset)
                setCursor('w-resize');
            else if (bottom < offset)
                setCursor('s-resize');
            else if (right < offset)
                setCursor('e-resize');
            else if (top < 30)
                setCursor('default')
            else
                setCursor('auto');
        }
        else {
            const hDrag = event.clientX - startDrag.x
            const vDrag = event.clientY - startDrag.y
            const cursor = ref.current!.style.cursor
            switch (cursor) {
                case 'n-resize': // top
                    setSizes({
                        ...prevSizes,
                        height: prevSizes.height - vDrag,
                        top: prevSizes.top + vDrag
                    })
                    break;
                case 'ne-resize': // top right
                    setSizes({
                        ...prevSizes,
                        width: prevSizes.width + hDrag,
                        height: prevSizes.height - vDrag,
                        top: prevSizes.top + vDrag
                    })
                    break;
                case 'e-resize': // right
                    setSizes({
                        ...prevSizes,
                        width: prevSizes.width + hDrag,
                    })
                    break;
                case 'se-resize': // bottom right
                    setSizes({
                        ...prevSizes,
                        width: prevSizes.width + hDrag,
                        height: prevSizes.height + vDrag,
                    })
                    break;
                case 's-resize': // bottom
                    setSizes({
                        ...prevSizes,
                        height: prevSizes.height + vDrag,
                    })
                    break;
                case 'sw-resize': // bottom left
                    setSizes({
                        ...prevSizes,
                        width: prevSizes.width - hDrag,
                        height: prevSizes.height + vDrag,
                        left: prevSizes.left + hDrag,
                    })
                    break;

                case 'w-resize': // left
                    setSizes({
                        ...prevSizes,
                        width: prevSizes.width - hDrag,
                        left: prevSizes.left + hDrag,
                    })
                    break;

                case 'nw-resize': // top left
                    setSizes({
                        width: prevSizes.width - hDrag,
                        height: prevSizes.height - vDrag,
                        left: prevSizes.left + hDrag,
                        top: prevSizes.top + vDrag
                    })
                    break;
                case 'default':
                    setSizes({
                        ...prevSizes,
                        left: prevSizes.left + hDrag,
                        top: prevSizes.top + vDrag
                    })
            }
        }
    }
    const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
        setIsDragging(true)
        setPrevSizes(sizes)
        setStartDrag({
            x: event.clientX,
            y: event.clientY
        })
    }
    const handleMouseUp = () => {
        setIsDragging(false)
    }
    useEffect(() => {
        window.addEventListener('mouseup', handleMouseUp)
        window.addEventListener('mousemove', handleMouseMove)
        return () => {
            window.removeEventListener('mouseup', handleMouseUp)
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [isDragging])
    return (
        <div ref={ref} style={{ cursor: cursor, width: sizes.width, height: sizes.height, left: sizes.left, top: sizes.top, backgroundColor }} onMouseDown={handleMouseDown} className={styles['window']}>
            {/* <div style={{ cursor: cursor, width: sizes.width, height: sizes.height }} onMouseMove={handleMouseMove} onMouseDown={handleMouseDown} className={styles['window']}> */}
        </div>
    );
};

export default Window;