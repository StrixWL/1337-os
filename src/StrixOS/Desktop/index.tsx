import { ReactNode, useEffect, MouseEvent, useState, useRef } from "react";
import { Sizes, Pos } from "../../utils/types";
import styles from "./Desktop.module.scss";

interface Desktop {
	children?: ReactNode;
}

interface SelectionBox {
	startPos: Pos;
	endPos: Pos;
	isDragging: boolean;
}

const Desktop = ({ children }: Desktop) => {
	const ref = useRef<HTMLDivElement>(null);
	const [boxState, setBoxState] = useState<SelectionBox>({
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
		if (boxState.startPos.x <= boxState.endPos.x) {
			if (boxState.startPos.y <= boxState.endPos.y) {
				// bottom right
				sizes.left = boxState.startPos.x;
				sizes.top = boxState.startPos.y;
				sizes.width = boxState.endPos.x - boxState.startPos.x;
				sizes.height = boxState.endPos.y - boxState.startPos.y;
			} else {
				// top right
				sizes.left = boxState.startPos.x;
				sizes.top = boxState.endPos.y;
				sizes.width = boxState.endPos.x - boxState.startPos.x;
				sizes.height = boxState.startPos.y - boxState.endPos.y;
			}
		} else {
			if (boxState.startPos.y < boxState.endPos.y) {
				// bottom left
				sizes.left = boxState.endPos.x;
				sizes.top = boxState.startPos.y;
				sizes.width = boxState.startPos.x - boxState.endPos.x;
				sizes.height = boxState.endPos.y - boxState.startPos.y;
			} else {
				// top left
				sizes.left = boxState.endPos.x;
				sizes.top = boxState.endPos.y;
				sizes.width = boxState.startPos.x - boxState.endPos.x;
				sizes.height = boxState.startPos.y - boxState.endPos.y;
			}
		}
		setSizes(sizes);
	}, [boxState]);
	useEffect(() => {
		window.addEventListener("mouseup", handleMouseUp);
		window.addEventListener("mousemove", handleMouseMove);
		return () => {
			window.removeEventListener("mouseup", handleMouseUp);
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, [boxState]);
	const handleMouseUp = () => {
		setBoxState({
			...boxState,
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
		if (boxState.isDragging) {
			setBoxState({
				...boxState,
				endPos: {
					x: posX,
					y: posY,
				},
			});
		}
	};
	const mouseDownHandler = (event: MouseEvent<HTMLDivElement>) => {
		if ((event.target as HTMLDivElement).id != "desktop") return;
		const boundingRect = ref.current!.getBoundingClientRect();
		var posX = event.clientX + window.scrollX - boundingRect.left;
		var posY = event.clientY + window.scrollY - boundingRect.top;
		setBoxState({
			...boxState,
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
	return (
		<div
			id="desktop"
			ref={ref}
			onMouseDown={mouseDownHandler}
			className={styles["Desktop"]}
		>
			{boxState.isDragging && (
				<div>
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
			{children}
		</div>
	);
};

export default Desktop;
