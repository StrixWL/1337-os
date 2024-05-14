import { useEffect } from "react";
import Webamp from "webamp";

const webamp = new Webamp({
	initialTracks: [],
});

const WinampComponent = () => {
	useEffect(() => {
		const webampElem = document.getElementById('winamp') as HTMLDivElement
		webamp.renderWhenReady(webampElem).then(() => {
			webampElem.appendChild(document.getElementById('webamp') as HTMLDivElement)
		});
	}, [])
	return (
		<div style={{
			position: 'fixed',
			visibility: "visible"
		}} id="winamp"></div>

	);
};

export default WinampComponent;
