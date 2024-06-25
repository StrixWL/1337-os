import { useEffect } from "react";
import styles from "./WindowHeader.module.scss";

interface WindowHeader {
	close: () => void;
	maximize: () => void;
	icon: string;
	title: string;
	focused: boolean;
}

const closeAudio = new Audio("./audio/window_close.wav")
const openAudio = new Audio("./audio/window_open.wav")

const WindowHeader = ({ close, maximize, title, focused }: WindowHeader) => {
	useEffect(() => {
		openAudio.play()
	}, [])
	return (
		<header
			style={{
				backgroundColor: focused ? "#F0D3EC" : "#DEDEDE"
			}}
			id="window-header"
			className={styles["window-header"]}
		>
			<div className={styles['icon']}></div>
			{/* <img src={icon}/> */}
			<h1>{ title }</h1>
			<div className={styles["window-control"]}>
				<button id="window-control-btn" className={styles["minimize-btn"]}></button>
				<button id="window-control-btn" onClick={maximize} className={styles["maximize-btn"]}></button>
				<button id="window-control-btn" onClick={() => {
					closeAudio.play()
					close()
				}} className={styles["close-btn"]}></button>
			</div>
		</header>
	);
};

export default WindowHeader;
