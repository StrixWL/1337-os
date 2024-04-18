import styles from "./WindowHeader.module.scss";

interface WindowHeader {
	close: () => void;
	maximize: () => void;
}
const WindowHeader = ({ close, maximize }: WindowHeader) => {
	return (
		<header id="window-header" className={styles["window-header"]}>
			<div className={styles["window-control"]}>
				<button id="window-control-btn" className={styles["minimize-btn"]}></button>
				<button id="window-control-btn" onClick={maximize} className={styles["maximize-btn"]}></button>
				<button id="window-control-btn" onClick={close} className={styles["close-btn"]}></button>
			</div>
		</header>
	);
};

export default WindowHeader;
