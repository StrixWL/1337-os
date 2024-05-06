import { ReactNode, useEffect, useState } from "react";
import styles from "./Desktop.module.scss";
import { SelectionBox, useSelectionBox } from "./SelectionBox";
import DesktopShortCut from "./DesktopShortCut";
import paintIcon from "../../assets/paint.png";

interface Desktop {
	children?: ReactNode;
}

const Desktop = ({ children }: Desktop) => {
	const { ref, mouseDownHandler, dragState, sizes } = useSelectionBox();
	const [shortCuts, setShortCuts] = useState([
		{ name: "Paint", icon: paintIcon, top: 100, left: 100, selected: false },
		{ name: "Paint", icon: paintIcon, top: 200, left: 200, selected: false },
	]);
	return (
		<div
			id="desktop"
			ref={ref}
			onMouseDown={mouseDownHandler}
			className={styles["Desktop"]}
		>
			<SelectionBox dragState={dragState} sizes={sizes} />
			{shortCuts.map((shortcut, index) => (
				<DesktopShortCut
					key={index}
					name={shortcut.name}
					icon={shortcut.icon}
					sizes={sizes}
					dragState={dragState}
					top={shortcut.top}
					left={shortcut.left}
					setSelected={(selected) => {
						const _shortCuts = [...shortCuts]
						_shortCuts[index].selected = selected
					}}
					setSelectedAlone={() => {
						const _shortCuts = shortCuts.map((shortcut) => {
							shortcut.selected = false
							return shortcut
						})
						_shortCuts[index].selected = true
					}}
					selected={shortcut.selected}
				/>
			))}
			{children}
		</div>
	);
};

export default Desktop;
