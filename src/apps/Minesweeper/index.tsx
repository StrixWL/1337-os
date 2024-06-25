import { useEffect, useRef } from "react";

const Minesweeper = () => {
	const ref = useRef<HTMLIFrameElement>(null)
	useEffect(() => {
		setTimeout(() => {
			const iframe = ref.current!.contentDocument || ref.current!.contentWindow!.document
			console.log(iframe.getElementById('play_area'))
		}, 2000)
	}, [])
	return (
		<iframe ref={ref}
			src="https://98.js.org/programs/minesweeper/"
			title="minesweeper"
			style={{
				width: "100%",
				height: "100%",
				backgroundColor: "rgb(192,192,192)",
			}}
		/>
	);
};

export default Minesweeper;
