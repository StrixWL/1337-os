import { ReactNode, useEffect, useState } from "react";
import styles from "./Desktop.module.scss";
import { SelectionBox, useSelectionBox } from "./SelectionBox";
import DesktopShortCut from "./DesktopShortCut";
import paintIcon from "../../assets/paint.png";
import tofIcon from "../../assets/tof.png";
import WinampIcon from "../../assets/winamp.png";
import CalculatorIcon from "../../assets/calculator.png";
import MinesweeperIcon from "../../assets/minesweeper.png";
import { App, DragState } from "../../utils/types";

interface Desktop {
	children?: ReactNode;
	launchApp: (name: App) => void
}

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
		setShortCuts(prevState => {
			const _shortCuts = prevState.map(shortcut => {
				const _shortcut = {...shortcut}
				_shortcut.selected = false
				return _shortcut
			})
			return _shortCuts
		})
	}
	const [shortCuts, setShortCuts] = useState([
		{
			name: "Winamp",
			icon: WinampIcon,
			top: 34,
			left: 34,
			selected: false,
			launch: () => {
				unselectAll()
				launchApp("WINAMP")
			}
		},
		{
			name: "Tower Of Fantasy",
			icon: tofIcon,
			top: 200,
			left: 34,
			selected: false,
			launch: () => {
				unselectAll()
				launchApp("TOF")
			}
		},
		{
			name: "Paint",
			icon: paintIcon,
			top: 120,
			left: 34,
			selected: false,
			launch: () => {
				unselectAll()
				launchApp("PAINT")
			}
		},
		{
			name: "Calculator",
			icon: CalculatorIcon,
			top: 295,
			left: 34,
			selected: false,
			launch: () => {
				unselectAll()
				launchApp("CALCULATOR")
			}
		},
		{
			name: "Minesweeper",
			icon: MinesweeperIcon,
			top: 385,
			left: 34,
			width: 200,
			selected: false,
			launch: () => {
				unselectAll()
				launchApp("MINESWEEPER")
			}
		},
	]);
	useEffect(() => {
		window.addEventListener("mouseup", handleMouseUp);
		window.addEventListener("mousemove", handleMouseMove);
		return () => {
			window.removeEventListener("mouseup", handleMouseUp);
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, [scDragState.isDragging]);

	const handleMouseUp = () => {
		setScDragState((prevState) => ({
			...prevState,
			isDragging: false,
		}));
	};

	const handleMouseMove = (event: globalThis.MouseEvent) => {
		if (scDragState.isDragging) {
			let hDrag = event.clientX - scDragState.startPos.x;
			let vDrag = event.clientY - scDragState.endPos.y;

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
			onMouseDown={mouseDownHandler}
			className={styles["Desktop"]}
		>
			{shortCuts.map((shortcut, index) => (
				<DesktopShortCut
					key={index}
					name={shortcut.name}
					icon={shortcut.icon}
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
