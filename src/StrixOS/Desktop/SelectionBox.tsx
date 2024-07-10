import { Sizes } from "../../utils/types";
import { DragState } from "../../utils/types";
import { MouseEvent, useRef, useState, useEffect, TouchEvent } from "react";

interface SelectionBoxProps {
	sizes: Sizes;
	boxDragState: DragState;
}

const useSelectionBox = () => {
	const ref = useRef<HTMLDivElement>(null);
	const [boxDragState, setDragState] = useState<DragState>({
		startPos: { x: 0, y: 0 },
		endPos: { x: 0, y: 0 },
		isDragging: false,
	});
	const [sizes, setSizes] = useState<Sizes>({
		left: 0,
		top: 0,
		width: 0,
		height: 0,
	});
	useEffect(() => {
		let sizes: Sizes = {
			left: 0,
			top: 0,
			width: 0,
			height: 0,
		};
		if (boxDragState.startPos.x <= boxDragState.endPos.x) {
			if (boxDragState.startPos.y <= boxDragState.endPos.y) {
				// bottom right
				sizes.left = boxDragState.startPos.x;
				sizes.top = boxDragState.startPos.y;
				sizes.width = boxDragState.endPos.x - boxDragState.startPos.x;
				sizes.height = boxDragState.endPos.y - boxDragState.startPos.y;
			} else {
				// top right
				sizes.left = boxDragState.startPos.x;
				sizes.top = boxDragState.endPos.y;
				sizes.width = boxDragState.endPos.x - boxDragState.startPos.x;
				sizes.height = boxDragState.startPos.y - boxDragState.endPos.y;
			}
		} else {
			if (boxDragState.startPos.y < boxDragState.endPos.y) {
				// bottom left
				sizes.left = boxDragState.endPos.x;
				sizes.top = boxDragState.startPos.y;
				sizes.width = boxDragState.startPos.x - boxDragState.endPos.x;
				sizes.height = boxDragState.endPos.y - boxDragState.startPos.y;
			} else {
				// top left
				sizes.left = boxDragState.endPos.x;
				sizes.top = boxDragState.endPos.y;
				sizes.width = boxDragState.startPos.x - boxDragState.endPos.x;
				sizes.height = boxDragState.startPos.y - boxDragState.endPos.y;
			}
		}
		setSizes(sizes);
	}, [boxDragState]);
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
	}, [boxDragState]);
	const handleMouseUp = () => {
		setDragState({
			...boxDragState,
			isDragging: false,
			startPos: { x: 0, y: 0 },
			endPos: { x: 0, y: 0 },
		});
		setSizes({
			left: 0,
			top: 0,
			width: 0,
			height: 0,
		});
	};
	const handleMouseMove = (event: globalThis.MouseEvent | globalThis.TouchEvent) => {
		let clientX, clientY
		if (event instanceof globalThis.TouchEvent) {
			clientX = event.changedTouches[0].clientX
			clientY = event.changedTouches[0].clientY
		}
		else {
			clientX = event.clientX
			clientY = event.clientY
		}

		const boundingRect = ref.current!.getBoundingClientRect();
		var posX = clientX + window.scrollX - boundingRect.left;
		var posY = clientY + window.scrollY - boundingRect.top;
		if (boxDragState.isDragging) {
			setDragState({
				...boxDragState,
				endPos: {
					x: posX,
					y: posY,
				},
			});
		}
	};
	const mouseDownHandler = (event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
		let clientX, clientY
		if (event.type == "touchstart") {
			clientX = (event as TouchEvent<HTMLDivElement>).changedTouches[0].clientX
			clientY = (event as TouchEvent<HTMLDivElement>).changedTouches[0].clientY
		}
		else {
			event.preventDefault();
			clientX = (event as MouseEvent<HTMLDivElement>).clientX
			clientY = (event as MouseEvent<HTMLDivElement>).clientY
		}	

		if ((event.target as HTMLDivElement).classList.contains("shortcut")) {
			setDragState({
				...boxDragState,
				isDragging: false
			});
			return;
		}
		if ((event.target as HTMLDivElement).id != "desktop") return;
		const boundingRect = ref.current!.getBoundingClientRect();
		var posX = clientX + window.scrollX - boundingRect.left;
		var posY = clientY + window.scrollY - boundingRect.top;
		setDragState({
			...boxDragState,
			isDragging: true,
			startPos: {
				x: posX,
				y: posY,
			},
			endPos: {
				x: posX,
				y: posY,
			},
		});
	};

	return { ref, mouseDownHandler, boxDragState, sizes };
}

const SelectionBox = ({ boxDragState, sizes }: SelectionBoxProps) => {
	return (
		<>
			{boxDragState.isDragging && (
				<div id="selection-box">
					{sizes.height > 1 && sizes.width > 1 && (
						<div
							style={{
								border: "1px dotted #cdb0b0",
								position: "absolute",
								left: sizes.left,
								top: sizes.top,
								width: sizes.width,
								height: sizes.height,
								minWidth: "1px",
								minHeight: "1px",
							}}
						></div>
					)}
					<div
						style={{
							position: "absolute",
							height: "100vh",
							width: "100vw",
							left: 0,
							right: 0,
							zIndex: 214748364,
						}}
					></div>
				</div>
			)}
		</>
	);
};

export {
    SelectionBox,
    useSelectionBox
};
