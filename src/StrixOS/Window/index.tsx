import styles from "./Window.module.scss";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { WindowProps, Sizes, Pos } from "../../utils/types";
import WindowHeader from "./WindowHeader";

const mouseDragAudio = new Audio("./audio/mousedrag.wav")

interface WindowState {
	sizes: Sizes;
	startDrag: Pos;
	isDragging: boolean;
	cursor: string;
    maximized: boolean;
    lastMouseDownTime: number;
	soundPlayed: boolean;
}

const Window = ({
	backgroundColor = "#8EF4E6",
	resizeOffset = 5,
	dragOffset = 35,
	minWidth = 200,
	minHeight = 200,
	width = 510,
	height = 400,
	Component = () => <></>,
	focus,
	deleteSelf,
    focused,
	zIndex = 1,
	iconUrl,
	title = "",
	removeHeader = false,
	resizable = true
}: WindowProps) => {
	const [state, setState] = useState<WindowState>({
		sizes: { width, height, left: 200, top: 100 },
		startDrag: { x: 0, y: 0 },
		isDragging: false,
		cursor: "auto",
        maximized: false,
        lastMouseDownTime: 0,
		soundPlayed: false
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
			if (!resizable)
                cursor = "default";
			else if (top < resizeOffset && left < resizeOffset)
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
			let _sp = state.soundPlayed
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
					if (!state.maximized && state.soundPlayed == false) {
						// ugly
						mouseDragAudio.play()
						_sp = true
					}
					newSizes = {
						...state.sizes,
						left: state.sizes.left + hDrag,
						top: state.sizes.top + vDrag,
					};
					break;
			}
			setState((prevState) => ({ ...prevState, sizes: newSizes, soundPlayed: _sp }));
		}
	};
	const handleMouseDown = function (event: MouseEvent<HTMLDivElement>) {
        // focus! >:(
        focus!();
        if ((event.target as HTMLDivElement).id == "window-control-btn")
            return;
        const time = (new Date()).getTime()
        const delta = time - state.lastMouseDownTime
		setState((prevState) => ({
			...prevState,
			isDragging: true,
			startDrag: {
				x: event.clientX,
				y: event.clientY,
			},
            maximized: delta < 250 ? !prevState.maximized : prevState.maximized,
            lastMouseDownTime: time
		}));
	};

	const handleMouseUp = (event: globalThis.MouseEvent) => {
        if ((event.target as HTMLDivElement).id != "cursor-overlay")
            return;
		setState((prevState) => ({ ...prevState, isDragging: false, soundPlayed: false }));
	};

	useEffect(() => {
		window.addEventListener("mouseup", handleMouseUp);
		window.addEventListener("mousemove", handleMouseMove);
		return () => {
			window.removeEventListener("mouseup", handleMouseUp);
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, [state.isDragging, state.soundPlayed]);
	return (
		<div
			id="window"
			ref={ref}
			style={removeHeader ? {
				cursor: state.cursor,
				left: "-9px",
				top: "-37px",
				zIndex: zIndex,
				visibility: "hidden"
			} : {
				cursor: state.cursor,
				height: state.maximized ? 'calc(100% - 42px)' : state.sizes.height,
				width: state.maximized ? 'calc(100% - 5px)' : state.sizes.width,
				left: state.maximized ? '-4px' : state.sizes.left,
				top: state.maximized ? '-3px' : state.sizes.top,
				backgroundColor: focused ? backgroundColor : "#DEDEDE",
				boxShadow: focused ? "4px 4px 0px 0px rgba(176, 164, 233, 0.6)" : "none",
				zIndex: zIndex,
			}}
			onMouseDown={handleMouseDown}
			className={styles["window"]}
		>
            <WindowHeader
				close={() => deleteSelf!()}
				maximize={() =>
					setState({ ...state, maximized: !state.maximized })
				}
				icon={iconUrl || ''}
				title={title}
				focused={focused ?? true}
			/>
			<div className={styles['container']}>
				<Component close={() => deleteSelf!()} />
			</div>
			{state.isDragging && (
				<div
                    id="cursor-overlay"
					className={styles["cursor-overlay"]}
					style={{
						cursor: state.cursor,
					}}
				></div>
			)}
            {!focused && (
				<div
					onMouseDown={() => {
						focus!();
					}}
					className={styles["window-overlay"]}
				></div>
            )}
		</div>
	);
};

export default Window;
