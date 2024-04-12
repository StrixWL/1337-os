import styles from "./Window.module.scss";
import { MouseEvent, useEffect, useRef, useState, ReactNode } from "react";

interface WindowProps {
    backgroundColor?: string;
    resizeOffset?: number;
    dragOffset?: number;
    minWidth?: number;
    minHeight?: number;
    children?: ReactNode;
}

interface WindowState {
    sizes: { width: number; height: number; left: number; top: number };
    startDrag: { x: number; y: number };
    isDragging: boolean;
    cursor: string;
}

const Window = ({
    backgroundColor = "transparent",
    resizeOffset = 10,
    dragOffset = 30,
    minWidth = 200,
    minHeight = 200,
    children,
}: WindowProps) => {
    const [state, setState] = useState<WindowState>({
        sizes: { width: 200, height: 200, left: 300, top: 200 },
        startDrag: { x: 0, y: 0 },
        isDragging: false,
        cursor: "auto",
    });
    const ref = useRef<HTMLDivElement>(null);

    const handleMouseMove = (event: globalThis.MouseEvent) => {
        if (!state.isDragging) {
            const boundingRect = ref.current!.getBoundingClientRect();
            const left = event.clientX - boundingRect.left;
            const top = event.clientY - boundingRect.top;
            const right = boundingRect.width - left;
            const bottom = boundingRect.height - top;

            let cursor = "auto";
            if (top < resizeOffset && left < resizeOffset) cursor = "nw-resize";
            else if (bottom < resizeOffset && left < resizeOffset)
                cursor = "sw-resize";
            else if (bottom < resizeOffset && right < resizeOffset)
                cursor = "se-resize";
            else if (top < resizeOffset && right < resizeOffset)
                cursor = "ne-resize";
            else if (top < resizeOffset)
				cursor = "n-resize";
            else if (left < resizeOffset)
				cursor = "w-resize";
            else if (bottom < resizeOffset)
				cursor = "s-resize";
            else if (right < resizeOffset)
				cursor = "e-resize";
            else if (top < dragOffset)
				cursor = "default";

            setState((prevState) => ({ ...prevState, cursor }));
        } else {
            const hDrag = event.clientX - state.startDrag.x;
            const vDrag = event.clientY - state.startDrag.y;
            const cursor = state.cursor;

            let newSizes = { ...state.sizes };

            switch (cursor) {
                case "n-resize": // top
                    newSizes = {
                        ...state.sizes,
                        height: state.sizes.height - vDrag,
                        top: state.sizes.top + vDrag,
                    };
                    break;
                case "ne-resize": // top right
                    newSizes = {
                        ...state.sizes,
                        width: state.sizes.width + hDrag,
                        height: state.sizes.height - vDrag,
                        top: state.sizes.top + vDrag,
                    };
                    break;
                case "e-resize": // right
                    newSizes = {
                        ...state.sizes,
                        width: state.sizes.width + hDrag,
                    };
                    break;
                case "se-resize": // bottom right
                    newSizes = {
                        ...state.sizes,
                        width: state.sizes.width + hDrag,
                        height: state.sizes.height + vDrag,
                    };
                    break;
                case "s-resize": // bottom
                    newSizes = {
                        ...state.sizes,
                        height: state.sizes.height + vDrag,
                    };
                    break;
                case "sw-resize": // bottom left
                    newSizes = {
                        ...state.sizes,
                        width: state.sizes.width - hDrag,
                        height: state.sizes.height + vDrag,
                        left: state.sizes.left + hDrag,
                    };
                    break;
                case "w-resize": // left
                    newSizes = {
                        ...state.sizes,
                        width: state.sizes.width - hDrag,
                        left: state.sizes.left + hDrag,
                    };
                    break;
                case "nw-resize": // top left
                    newSizes = {
                        ...state.sizes,
                        width: state.sizes.width - hDrag,
                        height: state.sizes.height - vDrag,
                        left: state.sizes.left + hDrag,
                        top: state.sizes.top + vDrag,
                    };
                    break;
                case "default":
                    newSizes = {
                        ...state.sizes,
                        left: state.sizes.left + hDrag,
                        top: state.sizes.top + vDrag,
                    };
                    break;
            }

            setState((prevState) => {
                if (newSizes.width < minWidth) {
                    newSizes.width = minWidth;
                    newSizes.left = prevState.sizes.left;
                }
                if (newSizes.height < minHeight) {
                    newSizes.height = minHeight;
                    newSizes.top = prevState.sizes.top;
                }
                return { ...prevState, sizes: newSizes };
            });
        }
    };

    const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
        setState((prevState) => ({
            ...prevState,
            isDragging: true,
            startDrag: {
                x: event.clientX,
                y: event.clientY,
            },
        }));
    };

    const handleMouseUp = () => {
        setState((prevState) => ({ ...prevState, isDragging: false }));
    };

    useEffect(() => {
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [state.isDragging]);

    return (
        <div
            ref={ref}
            style={{
                cursor: state.cursor,
                width: state.sizes.width,
                height: state.sizes.height,
                left: state.sizes.left,
                top: state.sizes.top,
                backgroundColor,
            }}
            onMouseDown={handleMouseDown}
            className={styles["window"]}
        >
            {children}
        </div>
    );
};

export default Window;
