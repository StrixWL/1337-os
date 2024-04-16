import styles from "./Window.module.scss";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { WindowProps } from "../../utils/types";

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
	focus,
	deleteSelf,
    focused,
	zIndex = 1,
}: WindowProps) => {
	const [state, setState] = useState<WindowState>({
		sizes: { width: 510, height: 400, left: 300, top: 200 },
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
			if (top < resizeOffset && left < resizeOffset)
                cursor = "nw-resize";
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

            if (ref.current!.style.cursor != cursor)
                setState((prevState) => ({ ...prevState, cursor }));
		} else {
			let hDrag = event.clientX - state.startDrag.x;
			let vDrag = event.clientY - state.startDrag.y;
			const cursor = state.cursor;

			let newSizes = { ...state.sizes };

			switch (cursor) {
				case "n-resize": // top
					if (state.sizes.height - vDrag < minHeight)
						vDrag = state.sizes.height - minHeight;
					newSizes = {
						...state.sizes,
						height: state.sizes.height - vDrag,
						top: state.sizes.top + vDrag,
					};
					break;
				case "ne-resize": // top right
					if (state.sizes.height - vDrag < minHeight)
						vDrag = state.sizes.height - minHeight;
					if (state.sizes.width + hDrag < minWidth)
						hDrag = minWidth - state.sizes.width;
					newSizes = {
						...state.sizes,
						width: state.sizes.width + hDrag,
						height: state.sizes.height - vDrag,
						top: state.sizes.top + vDrag,
					};
					break;
				case "e-resize": // right
					if (state.sizes.width + hDrag < minWidth)
						hDrag = minWidth - state.sizes.width;
					newSizes = {
						...state.sizes,
						width: state.sizes.width + hDrag,
					};
					break;
				case "se-resize": // bottom right
					if (state.sizes.width + hDrag < minWidth)
						hDrag = minWidth - state.sizes.width;
					if (state.sizes.height + vDrag < minHeight)
						vDrag = minHeight - state.sizes.height;
					newSizes = {
						...state.sizes,
						width: state.sizes.width + hDrag,
						height: state.sizes.height + vDrag,
					};
					break;
				case "s-resize": // bottom
					if (state.sizes.height + vDrag < minHeight)
						vDrag = minHeight - state.sizes.height;
					newSizes = {
						...state.sizes,
						height: state.sizes.height + vDrag,
					};
					break;
				case "sw-resize": // bottom left
					if (state.sizes.width - hDrag < minWidth)
						hDrag = state.sizes.width - minWidth;
					if (state.sizes.height + vDrag < minHeight)
						vDrag = minHeight - state.sizes.height;
					newSizes = {
						...state.sizes,
						width: state.sizes.width - hDrag,
						height: state.sizes.height + vDrag,
						left: state.sizes.left + hDrag,
					};
					break;
				case "w-resize": // left
					if (state.sizes.width - hDrag < minWidth)
						hDrag = state.sizes.width - minWidth;
					newSizes = {
						...state.sizes,
						width: state.sizes.width - hDrag,
						left: state.sizes.left + hDrag,
					};
					break;
				case "nw-resize": // top left
					if (state.sizes.height - vDrag < minHeight)
						vDrag = state.sizes.height - minHeight;
					if (state.sizes.width - hDrag < minWidth)
						hDrag = state.sizes.width - minWidth;
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
			setState((prevState) => ({ ...prevState, sizes: newSizes }));
		}
	};
	const handleMouseDown = function (event: MouseEvent<HTMLDivElement>) {
        if ((event.target as HTMLDivElement).id != "window")
            return;
        // focus! >:(
		focus!();
		setState((prevState) => ({
			...prevState,
			isDragging: true,
			startDrag: {
				x: event.clientX,
				y: event.clientY,
			},
		}));
	};

	const handleMouseUp = (event: globalThis.MouseEvent) => {
        if ((event.target as HTMLDivElement).id != "cursor-overlay")
            return;
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
			id="window"
			ref={ref}
			style={{
				cursor: state.cursor,
				width: state.sizes.width,
				height: state.sizes.height,
				left: state.sizes.left,
				top: state.sizes.top,
				backgroundColor,
				zIndex: zIndex,
			}}
			onMouseDown={handleMouseDown}
			className={styles["window"]}
		>
			<button
				className={styles["del-btn"]}
				onClick={() => {
					console.log("deleting self");
					deleteSelf!();
				}}
			>
				X
			</button>
			{children}
			{state.isDragging && (
				<div
                    id="cursor-overlay"
                    className={styles['cursor-overlay']}
					style={{
						cursor: state.cursor,
					}}
				></div>
			)}
            {!focused && (
                <div onMouseDown={() => {
                    focus!()
                }} className={styles['window-overlay']}></div>
            )}
		</div>
	);
};

export default Window;
