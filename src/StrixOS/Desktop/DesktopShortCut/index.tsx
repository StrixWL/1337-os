import { useEffect, useRef, useState } from "react";
import styles from "./DesktopShortCut.module.scss";
import { DragState, Sizes } from "../../../utils/types";

interface DesktopShortCut {
	name: string;
	icon: string;
	sizes: Sizes;
	left: number;
	top: number;
	dragState: DragState;
	setSelected: ((selected: boolean) => void);
	setSelectedAlone: (() => void); // sets shortcut selected and remove all other shortcuts
	selected: boolean
}

const DesktopShortCut = ({
	name,
	icon,
	sizes,
	top,
	left,
	dragState,
	setSelected,
	setSelectedAlone,
	selected
}: DesktopShortCut) => {
	const [state, setState] = useState({
		left,
		top,
	});
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
				left: state.left,
				right: state.left + 60,
				top: state.top,
				bottom: state.top + 72,
			};
			const horizontalIntersect =
				box.left < rect2.right && box.right > rect2.left;
			const verticalIntersect =
				box.top < rect2.bottom && box.bottom > rect2.top;
			setSelected(horizontalIntersect && verticalIntersect)
		}
	}, [sizes]);
	return (
		<div
			onMouseDown={(event) => {
				event.preventDefault();
				if (!selected)
					setSelectedAlone()
			}}
			onClick={(event) => {
				setSelectedAlone()
			}}
			ref={ref}
			style={{
				left: state.left,
				top: state.top,
			}}
			className={`${styles["desktop-shortcut"]} shortcut`}
		>
			<div
				className={
					styles["shortcut-icon"] +
					(selected ? " " + styles["active"] : "")
				}
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
