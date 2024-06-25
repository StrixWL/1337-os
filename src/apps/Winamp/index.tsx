import { useEffect } from "react";
import Webamp from "webamp";

interface WinampComponent {
	close?: () => void;
	minimize?: () => void;
}

const closeAudio = new Audio("./audio/window_close.wav")

const WinampComponent = ({ close, minimize }: WinampComponent) => {
	useEffect(() => {
		const webamp = new Webamp({
			initialTracks: [
				{
					metaData: {
						artist: "mynamefishy",
						title: "freegames-dot-com",
					},
					url: "/songs/freegames-dot-com.mp3",
				},
			],
			availableSkins: [
				{
					url: "/webamp/themes/Iwakura_Lain.wsz",
					name: "lain 1",
				},
				{
					url: "/webamp/themes/lainamp.ZIP",
					name: "lain 2 (default)",
				},
				{
					url: "/webamp/themes/Rei_Ayanami_NGE.wsz",
					name: "rei",
				},
				{
					url: "/webamp/themes/bd3bf6250ffd41012a07e0601bb0fb4c.wsz",
					name: "-",
				}
			],
			initialSkin: {
				url: "/webamp/themes/lainamp.ZIP",
			},
			zIndex: 214748364,
		});
		const webampElem = document.getElementById("winamp") as HTMLDivElement;
		webamp.renderWhenReady(webampElem).then(() => {
			webampElem.appendChild(
				document.getElementById("webamp") as HTMLDivElement
			);
		});
		webamp.onClose(() => {
			webamp.dispose();
			closeAudio.play()
			close!();
		});
		webamp.onMinimize(() => {
			minimize!()
		})
	}, []);
	return (
		<div
			style={{
				position: "fixed",
				visibility: "visible",
			}}
			id="winamp"
		></div>
	);
};

export default WinampComponent;
