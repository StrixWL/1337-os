import styles from "./Taskbar.module.scss";
import windowsIcon from "../../assets/win.png";
import { useEffect, useState } from "react";
import { Windows } from "../../utils/types";
import TaskbarStartMenu from "./TaskbarStartMenu/TaskbarStartMenu";

const getTime = () => {
	const date = new Date();
	let hours = date.getHours();
	const minutes = date.getMinutes();
	const ampm = hours >= 12 ? "PM" : "AM";

	hours = hours % 12;
	hours = hours ? hours : 12;

	const formattedTime = `${hours}:${
		minutes < 10 ? "0" : ""
	}${minutes} ${ampm}`;
	return formattedTime;
};

interface Taskbar {
	windows: Windows;
	focusWindow: (id: number) => void;
	deleteWindow: (id: number) => void;
}

const Taskbar = ({ windows, focusWindow, deleteWindow }: Taskbar) => {
	const [time, setTime] = useState(getTime());

	const closeAll = () => {
		Object.keys(windows).forEach(key => {
			const window = windows[parseInt(key)]
			if (window) {
				deleteWindow(window.id!)
			}
		})
	}
	useEffect(() => {
		const date = new Date();
		let seconds = date.getSeconds();
		setTimeout(() => {
			setTime(getTime());
			setInterval(() => {
				setTime(getTime());
			}, 60000);
		}, 60000 - seconds * 1000);
	}, []);

	const [displayStart, setDisplayStart] = useState(false);

	const toggleStart = () => setDisplayStart(!displayStart);

	return (
		<div className={styles["Taskbar"]}>
			<button id="start-btn" onClick={toggleStart} className={styles["start"]}>
				<img src={windowsIcon} />
				START
			</button>
			{displayStart && <TaskbarStartMenu closeAll={closeAll} toggleStart={toggleStart} />}
			<div className={styles["opened-windows"]}>
				{Object.keys(windows).map((key: string) => {
					const window = windows[parseInt(key)];
					if (!window) return null;
					return (
						<button
							key={key}
							className={`${styles["window"]} ${
								window.id == windows.focus && !window.minimized
									? styles["active"]
									: ""
							}`}
							onClick={() => focusWindow(window.id!)}
						>
							<div className={styles["icon"]}></div>
							{/* <img src={window.iconUrl}/> */}
							<span>{window.title}</span>
						</button>
					);
				})}
			</div>
			<div className={styles["system-tray"]}>
				<div className={styles["time"]}>{time}</div>
			</div>
		</div>
	);
};

export default Taskbar;
