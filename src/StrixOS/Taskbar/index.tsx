import styles from "./Taskbar.module.scss";
import windowsIcon from "../../assets/win.png";
import { useEffect, useState } from "react";
import { Windows } from "../../utils/types";

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
}

const Taskbar = ({ windows, focusWindow }: Taskbar) => {
	const [time, setTime] = useState(getTime());
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
	return (
		<div className={styles["Taskbar"]}>
			<button className={styles["start"]}>
				<img src={windowsIcon} />
				Start
			</button>
			<div className={styles["opened-windows"]}>
				{Object.keys(windows).map((key: string) => {
					const window = windows[parseInt(key)];
					if (!window) return null;
					return (
						<button
							key={key}
							className={`${styles["window"]} ${window.id == windows.focus ? styles["active"] : ''}`}
							onClick={() => focusWindow(window.id!)}
						>
							<img src={window.iconUrl}/>
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
