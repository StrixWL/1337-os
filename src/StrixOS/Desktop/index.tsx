import { ReactNode, useEffect, useState } from "react";
import styles from "./Desktop.module.scss";
import { SelectionBox, useSelectionBox } from "./SelectionBox";
import DesktopShortCut from "./DesktopShortCut";
import { App, DragState } from "../../utils/types";
import Apps from "../../apps";

interface Desktop {
	children?: ReactNode;
	launchApp: (name: App) => void;
}

const getApps = (unselectAll: () => void, launchApp: (name: App) => void) => {
	const windowHeight = window.innerHeight;
	let currentLeft = 34;
	let currentTop = 30;

	const apps = Object.keys(Apps).map((key) => {
		const app = Apps[key as keyof typeof Apps];

		if (currentTop + 90 > windowHeight) {
			currentLeft += 100;
			currentTop = 30;
		}
		const appData = {
			name: app.name || "Untitled",
			iconUrl: app.iconUrl || "",
			left: currentLeft,
			top: currentTop,
			selected: false,
			launch: () => {
				unselectAll();
				launchApp(key as keyof typeof Apps);
			},
		};

		currentTop += 90;
		return appData;
	});

	return apps;
};

// sc = shortcut
const Desktop = ({ children, launchApp }: Desktop) => {
	const { ref, mouseDownHandler, boxDragState, sizes } = useSelectionBox();
	const [scDragState, setScDragState] = useState<DragState>({
		startPos: {
			x: 0,
			y: 0,
		},
		endPos: {
			x: 0,
			y: 0,
		},
		isDragging: false,
	});
	const unselectAll = () => {
		setShortCuts((prevState) => {
			const _shortCuts = prevState.map((shortcut) => {
				const _shortcut = { ...shortcut };
				_shortcut.selected = false;
				return _shortcut;
			});
			return _shortCuts;
		});
	};
	const [shortCuts, setShortCuts] = useState(getApps(unselectAll, launchApp));
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
	}, [scDragState.isDragging]);

	const handleMouseUp = () => {
		setScDragState((prevState) => ({
			...prevState,
			isDragging: false,
		}));
	};

	const handleMouseMove = (event: globalThis.MouseEvent | globalThis.TouchEvent) => {
		let clientX, clientY
		if (event.type == "touchmove") {
			clientX = (event as globalThis.TouchEvent).changedTouches[0].clientX;
			clientY = (event as globalThis.TouchEvent).changedTouches[0].clientY;
		} else {
			clientX = (event as globalThis.MouseEvent).clientX;
			clientY = (event as globalThis.MouseEvent).clientY;
		}

		if (scDragState.isDragging) {
			let hDrag = clientX - scDragState.startPos.x;
			let vDrag = clientY - scDragState.endPos.y;

			let _shortCuts = shortCuts.map((shortcut) => {
				const _shortcut = { ...shortcut };
				if (_shortcut.selected) {
					_shortcut.left = _shortcut.left + hDrag;
					_shortcut.top = _shortcut.top + vDrag;
				}
				return _shortcut;
			});
			setShortCuts(_shortCuts);
		}
	};

	return (
		<div
			id="desktop"
			ref={ref}
			onTouchStart={mouseDownHandler}
			onMouseDown={mouseDownHandler}
			className={styles["Desktop"]}
		>
			{shortCuts.map((shortcut, index) => (
				<DesktopShortCut
					key={index}
					name={shortcut.name}
					icon={shortcut.iconUrl}
					sizes={sizes}
					top={shortcut.top}
					left={shortcut.left}
					setSelected={(selected) => {
						const _shortCuts = [...shortCuts];
						_shortCuts[index].selected = selected;
					}}
					setSelectedAlone={() => {
						const _shortCuts = shortCuts.map((shortcut) => {
							shortcut.selected = false;
							return shortcut;
						});
						_shortCuts[index].selected = true;
					}}
					isDragging={scDragState.isDragging}
					selected={shortcut.selected}
					setScDragState={setScDragState}
					launch={shortcut.launch}
				/>
			))}
			<SelectionBox boxDragState={boxDragState} sizes={sizes} />
			{children}
		</div>
	);
};

export default Desktop;
