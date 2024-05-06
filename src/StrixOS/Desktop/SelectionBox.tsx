import { Sizes } from "../../utils/types";
import { DragState } from "../../utils/types";
import { MouseEvent, useRef, useState, useEffect } from "react";

interface SelectionBoxProps {
	sizes: Sizes;
	dragState: DragState;
}

const useSelectionBox = () => {
	const ref = useRef<HTMLDivElement>(null);
	const [dragState, setDragState] = useState<DragState>({
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
		if (dragState.startPos.x <= dragState.endPos.x) {
			if (dragState.startPos.y <= dragState.endPos.y) {
				// bottom right
				sizes.left = dragState.startPos.x;
				sizes.top = dragState.startPos.y;
				sizes.width = dragState.endPos.x - dragState.startPos.x;
				sizes.height = dragState.endPos.y - dragState.startPos.y;
			} else {
				// top right
				sizes.left = dragState.startPos.x;
				sizes.top = dragState.endPos.y;
				sizes.width = dragState.endPos.x - dragState.startPos.x;
				sizes.height = dragState.startPos.y - dragState.endPos.y;
			}
		} else {
			if (dragState.startPos.y < dragState.endPos.y) {
				// bottom left
				sizes.left = dragState.endPos.x;
				sizes.top = dragState.startPos.y;
				sizes.width = dragState.startPos.x - dragState.endPos.x;
				sizes.height = dragState.endPos.y - dragState.startPos.y;
			} else {
				// top left
				sizes.left = dragState.endPos.x;
				sizes.top = dragState.endPos.y;
				sizes.width = dragState.startPos.x - dragState.endPos.x;
				sizes.height = dragState.startPos.y - dragState.endPos.y;
			}
		}
		setSizes(sizes);
	}, [dragState]);
	useEffect(() => {
		window.addEventListener("mouseup", handleMouseUp);
		window.addEventListener("mousemove", handleMouseMove);
		return () => {
			window.removeEventListener("mouseup", handleMouseUp);
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, [dragState]);
	const handleMouseUp = () => {
		setDragState({
			...dragState,
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
	const handleMouseMove = (event: globalThis.MouseEvent) => {
		const boundingRect = ref.current!.getBoundingClientRect();
		var posX = event.clientX + window.scrollX - boundingRect.left;
		var posY = event.clientY + window.scrollY - boundingRect.top;
		if (dragState.isDragging) {
			setDragState({
				...dragState,
				endPos: {
					x: posX,
					y: posY,
				},
			});
		}
	};
	const mouseDownHandler = (event: MouseEvent<HTMLDivElement>) => {
		if ((event.target as HTMLDivElement).classList.contains("shortcut")) {
			setDragState({
				...dragState,
				isDragging: false
			});
			return;
		}
		if ((event.target as HTMLDivElement).id != "desktop") return;
		const boundingRect = ref.current!.getBoundingClientRect();
		var posX = event.clientX + window.scrollX - boundingRect.left;
		var posY = event.clientY + window.scrollY - boundingRect.top;
		setDragState({
			...dragState,
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

	return { ref, mouseDownHandler, dragState, sizes };
}

const SelectionBox = ({ dragState, sizes }: SelectionBoxProps) => {
	return (
		<>
			{dragState.isDragging && (
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
