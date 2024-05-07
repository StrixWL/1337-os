import { MouseEvent, useEffect, useRef, useState } from "react";
import styles from "./DesktopShortCut.module.scss";
import { DragState, Sizes } from "../../../utils/types";

interface DesktopShortCut {
	name: string;
	icon: string;
	sizes: Sizes;
	left: number;
	top: number;
	setSelected: (selected: boolean) => void;
	setSelectedAlone: () => void; // sets shortcut selected and remove all other shortcuts
	selected: boolean;
	setScDragState: (state: DragState) => void;
}

const DesktopShortCut = ({
	name,
	icon,
	sizes,
	top,
	left,
	setSelected,
	setSelectedAlone,
	selected,
	setScDragState,
}: DesktopShortCut) => {
	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const selectionBox = document.getElementById("selection-box");
		if (selectionBox) {
			const box = {
				left: sizes.left,
				right: sizes.left + sizes.width,
				top: sizes.top,
				bottom: sizes.top + sizes.height,
			};
			const rect2 = {
				left: left + 5,
				right: left + 72,
				top: top,
				bottom: top + 80,
			};
			const horizontalIntersect =
				box.left < rect2.right && box.right > rect2.left;
			const verticalIntersect =
				box.top < rect2.bottom && box.bottom > rect2.top;
			setSelected(horizontalIntersect && verticalIntersect);
		}
	}, [sizes]);

	const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		if (!selected) setSelectedAlone();
		setScDragState({
			startPos: {
				x: event.clientX,
				y: event.clientY,
			},
			endPos: {
				x: event.clientX,
				y: event.clientY,
			},
			isDragging: true,
		});
	};
	return (
		<div
			onMouseDown={handleMouseDown}
			onClickCapture={(event) => {
				setSelectedAlone();
			}}
			ref={ref}
			style={{
				left: left,
				top: top,
			}}
			className={`${styles["desktop-shortcut"]} shortcut`}
		>
			<div
				className={
					styles["shortcut-icon"] +
					(selected ? " " + styles["active"] : "")
				}
				style={{
					maskImage: `url(${icon})`,
				}}
			>
				<img className="shortcut" src={icon} />
			</div>
			<span
				className="shortcut"
				style={{
					backgroundColor: selected ? "#000080" : "transparent",
				}}
			>
				{name}
			</span>
		</div>
	);
};

export default DesktopShortCut;
