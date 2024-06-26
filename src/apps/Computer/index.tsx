import { useState } from "react";

const Computer = () => {
	const [state] = useState(Math.random())
	return (
		<iframe
			src={"./?r=" + state}
			title="computer"
			style={{
				width: "100%",
				height: "100%",
				backgroundColor: "rgb(192,192,192)",
			}}
		/>
	);
};

export default Computer;
