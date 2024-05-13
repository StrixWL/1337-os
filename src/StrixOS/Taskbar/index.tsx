import styles from "./Taskbar.module.scss";
import windowsIcon from "../../assets/win.png";
import { useEffect, useState } from "react";

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

const Taskbar = () => {
	const [time, setTime] = useState(getTime())
	useEffect(() => {
		const date = new Date();
		let seconds = date.getSeconds();
		setTimeout(() => {
			setTime(getTime())
			setInterval(() => {
				setTime(getTime())
			}, 60000)
		}, 60000 - seconds * 1000)
	}, [])
	return (
		<div className={styles["Taskbar"]}>
			<button className={styles["start"]}>
				<img src={windowsIcon} />
				Start
			</button>
			<div className={styles["opened-windows"]}>
			</div>
			<div className={styles["system-tray"]}>
				<div className={styles["time"]}>{time}</div>
			</div>
		</div>
	);
};

export default Taskbar;
