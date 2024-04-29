import styles from "./Taskbar.module.scss";
import windowsIcon from "../../assets/win.png";

const Taskbar = () => {
	return (
		<div className={styles["Taskbar"]}>
			<button className={styles["start"]}>
				<img src={windowsIcon} />
				Start
			</button>
		</div>
	);
};

export default Taskbar;
