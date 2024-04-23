import { ReactNode } from "react";
import styles from "./Desktop.module.scss";
import { SelectionBox, useSelectionBox } from "./SelectionBox";

interface Desktop {
	children?: ReactNode;
}

const Desktop = ({ children }: Desktop) => {
	const { ref, mouseDownHandler, dragState, sizes } = useSelectionBox()
	return (
		<div
			id="desktop"
			ref={ref}
			onMouseDown={mouseDownHandler}
			className={styles["Desktop"]}
		>
			<SelectionBox dragState={dragState} sizes={sizes}/>
			{children}
		</div>
	);
};

export default Desktop;
