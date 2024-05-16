import { useEffect } from "react";
import Webamp from "webamp";

interface WinampComponent {
	close?: () => void
}

const WinampComponent = ({
	close
}: WinampComponent) => {
	useEffect(() => {
		const webamp = new Webamp({
			initialTracks: [],
			zIndex: 214748364
		});
		const webampElem = document.getElementById('winamp') as HTMLDivElement
		webamp.renderWhenReady(webampElem).then(() => {
			webampElem.appendChild(document.getElementById('webamp') as HTMLDivElement)
		});
		webamp.onClose(() => {
			webamp.dispose()
			close!()
		})
	}, [])
	return (
		<div style={{
			position: 'fixed',
			visibility: "visible"
		}} id="winamp"></div>
	);
};

export default WinampComponent;
