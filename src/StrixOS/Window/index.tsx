/* still needs lot of refactoring :( */

import styles from "./Window.module.scss";
import { MouseEvent, TouchEvent, useEffect, useRef, useState } from "react";
import { WindowProps, Sizes, Pos } from "../../utils/types";
import WindowHeader from "./WindowHeader";

// const mouseDragAudio = new Audio("./audio/mousedrag.wav")

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
	backgroundColor = "black",
	resizeOffset = 5,
	dragOffset = 35,
	minWidth = 200,
	minHeight = 200,
	width = 510,
	height = 400,
	Component = () => <></>,
	focus,
	deleteSelf,
	minimizeSelf,
	focused,
	zIndex = 1,
	iconUrl,
	title = "",
	removeHeader = false,
	resizable = true,
	maximized = false,
	minimized = false,
}: WindowProps) => {
	const [state, setState] = useState<WindowState>({
		sizes: { width, height, left: window.innerWidth / 10, top: window.innerHeight / 10 },
		startDrag: { x: 0, y: 0 },
		isDragging: false,
		cursor: "auto",
		maximized: maximized,
		lastMouseDownTime: 0,
		soundPlayed: false,
	});
	const ref = useRef<HTMLDivElement>(null);

	const getCursor = (clientX: number, clientY: number) => {
		const boundingRect = ref.current!.getBoundingClientRect();
		const left = clientX - boundingRect.left;
		const top = clientY - boundingRect.top;
		const right = boundingRect.width - left;
		const bottom = boundingRect.height - top;

		let cursor = ref.current!.style.cursor;
		if (!resizable) cursor = "default";
		else if (top < resizeOffset && left < resizeOffset)
			cursor = "nw-resize";
		else if (bottom < resizeOffset && left < resizeOffset)
			cursor = "sw-resize";
		else if (bottom < resizeOffset && right < resizeOffset)
			cursor = "se-resize";
		else if (top < resizeOffset && right < resizeOffset)
			cursor = "ne-resize";
		else if (top < resizeOffset) cursor = "n-resize";
		else if (left < resizeOffset) cursor = "w-resize";
		else if (bottom < resizeOffset) cursor = "s-resize";
		else if (right < resizeOffset) cursor = "e-resize";
		else if (top < dragOffset) cursor = "default";

		return cursor;
	};
	const handleMouseMove = (
		event: globalThis.MouseEvent | globalThis.TouchEvent
	) => {
		let clientX, clientY;
		if (event instanceof globalThis.TouchEvent) {
			clientX = event.changedTouches[0].clientX;
			clientY = event.changedTouches[0].clientY;
		} else {
			clientX = event.clientX;
			clientY = event.clientY;
		}
		if (!state.isDragging) {
			let cursor = getCursor(clientX, clientY);

			if (ref.current!.style.cursor != cursor)
				setState((prevState) => ({ ...prevState, cursor }));
		} else {
			let _sp = state.soundPlayed;
			let hDrag = clientX - state.startDrag.x;
			let vDrag = clientY - state.startDrag.y;
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
						// mouseDragAudio.play()
						_sp = true;
					}
					newSizes = {
						...state.sizes,
						left: state.sizes.left + hDrag,
						top: state.sizes.top + vDrag,
					};
					break;
			}
			setState((prevState) => ({
				...prevState,
				sizes: newSizes,
				soundPlayed: _sp,
			}));
		}
	};

	const handleMouseDown = function (
		event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>
	) {
		let clientX, clientY;
		let cursor = "default";
		console.log(event.type);
		if (event.type == "touchstart") {
			clientX = (event as TouchEvent<HTMLDivElement>).changedTouches[0]
				.clientX;
			clientY = (event as TouchEvent<HTMLDivElement>).changedTouches[0]
				.clientY;

			cursor = getCursor(clientX, clientY);
		} else {
			clientX = (event as MouseEvent<HTMLDivElement>).clientX;
			clientY = (event as MouseEvent<HTMLDivElement>).clientY;
			cursor = ref.current!.style.cursor;
		}
		// focus! >:(
		focus!();
		if ((event.target as HTMLDivElement).id == "window-control-btn") return;
		setState((prevState) => ({
			...prevState,
			isDragging: true,
			startDrag: {
				x: clientX,
				y: clientY,
			},
			cursor,
		}));
	};

	const handleMouseUp = (
		event: globalThis.MouseEvent | globalThis.TouchEvent
	) => {
		let time = new Date().getTime();
		let delta = time - state.lastMouseDownTime;
		if (event.type != "mouseup")
			time = state.lastMouseDownTime
		if (
			event.type == "mouseup" &&
			(event.target as HTMLDivElement).id != "cursor-overlay"
		)
			return;
		setState((prevState) => ({
			...prevState,
			isDragging: false,
			soundPlayed: false,
			maximized: delta < 250 ? !prevState.maximized : prevState.maximized,
			lastMouseDownTime: time,
		}));
	};
	useEffect(() => {
		window.addEventListener("mouseup", handleMouseUp);
		window.addEventListener("touchend", handleMouseUp);

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("touchmove", handleMouseMove);
		return () => {
			window.removeEventListener("mouseup", handleMouseUp);
			window.removeEventListener("touchend", handleMouseUp);
	
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("touchmove", handleMouseMove);
		};
	}, [
		state.isDragging,
		state.soundPlayed,
		state.startDrag,
		focused,
		zIndex,
		state.lastMouseDownTime,
	]);
	return (
		<div
			id="window"
			ref={ref}
			style={
				removeHeader
					? {
							cursor: state.cursor,
							left: "-9px",
							top: "-39px",
							zIndex: zIndex,
							visibility: "hidden",
							display: minimized ? "none" : "block",
					  }
					: {
							cursor: state.cursor,
							height: state.maximized
								? "calc(100% - 42px)"
								: state.sizes.height,
							width: state.maximized
								? "calc(100% - 5px)"
								: state.sizes.width,
							left: state.maximized ? "-4px" : state.sizes.left,
							top: state.maximized ? "-3px" : state.sizes.top,
							backgroundColor: focused
								? backgroundColor
								: "#DEDEDE",
							boxShadow: focused
								? "4px 4px 0px 0px rgba(176, 164, 233, 0.6)"
								: "none",
							zIndex: zIndex,
							display: minimized ? "none" : "block",
					  }
			}
			onMouseDown={handleMouseDown}
			onTouchStart={handleMouseDown}
			className={styles["window"]}
		>
			<WindowHeader
				close={() => deleteSelf!()}
				minimize={() => minimizeSelf!()}
				maximize={() =>
					setState({ ...state, maximized: !state.maximized })
				}
				icon={iconUrl || ""}
				title={title}
				focused={focused ?? true}
			/>
			<div className={styles["container"]}>
				<Component
					close={() => deleteSelf!()}
					minimize={() => minimizeSelf!()}
				/>
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
					onTouchStart={() => {
						focus!();
					}}
					className={styles["window-overlay"]}
				></div>
			)}
		</div>
	);
};

export default Window;
