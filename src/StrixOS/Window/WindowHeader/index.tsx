import styles from "./WindowHeader.module.scss";
import { ReactNode } from "react";

interface WindowHeader {
	close: () => void;
	maximize: () => void;
	icon: ReactNode;
	title: string;
}
const WindowHeader = ({ close, maximize, title, icon }: WindowHeader) => {
	return (
		<header id="window-header" className={styles["window-header"]}>
			{icon}
			<h1>{ title }</h1>
			<div className={styles["window-control"]}>
				<button id="window-control-btn" className={styles["minimize-btn"]}></button>
				<button id="window-control-btn" onClick={maximize} className={styles["maximize-btn"]}></button>
				<button id="window-control-btn" onClick={close} className={styles["close-btn"]}></button>
			</div>
		</header>
	);
};

export default WindowHeader;
