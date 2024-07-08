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
				// {
				// 	metaData: {
				// 		artist: "mynamefishy",
				// 		title: "freegames-dot-com",
				// 	},
				// 	url: "/songs/freegames-dot-com.mp3",
				// },
				// {
				// 	metaData: {
				// 		artist: "4get",
				// 		title: "MYHEADDONTFEELRIGHT",
				// 	},
				// 	url: "/songs/MYHEADDONTFEELRIGHT.mp3",
				// },
				// {
				// 	metaData: {
				// 		artist: "𝐱𝐧𝟖𝟖𝐚𝐱",
				// 		title: "LOTTERY",
				// 	},
				// 	url: "/songs/LOTTERY.mp3",
				// },
				// {
				// 	metaData: {
				// 		artist: "𝐱𝐧𝟖𝟖𝐚𝐱",
				// 		title: "PSYCHODREAMS",
				// 	},
				// 	url: "/songs/PSYCHODREAMS.mp3",
				// },
				// {
				// 	metaData: {
				// 		artist: "BalanceBreaker",
				// 		title: "Omoi - Teo (Frenchcore)",
				// 	},
				// 	url: "/songs/Omoi - Teo.mp3",
				// },
				{
					metaData: {
						artist: "baatoonn",
						title: "Kiss me again",
					},
					url: "/songs/x/1.mp3",
				},
				{
					metaData: {
						artist: "herowhither",
						title: "Truth",
					},
					url: "/songs/x/2.mp3",
				},
				{
					metaData: {
						artist: "herowhither",
						title: "World",
					},
					url: "/songs/x/3.mp3",
				},
				// {
				// 	metaData: {
				// 		artist: "herowhither",
				// 		title: "Together",
				// 	},
				// 	url: "/songs/x/6.mp3",
				// },
				{
					metaData: {
						artist: "blooz",
						title: "Broken",
					},
					url: "/songs/x/4.mp3",
				},
				{
					metaData: {
						artist: "roi",
						title: "Videoclub instrumental (slowed)",
					},
					url: "/songs/x/5.mp3",
				},
			],
			availableSkins: [
				{
					url: "/webamp/themes/Iwakura_Lain.wsz",
					name: "lain 1",
				},
				{
					url: "/webamp/themes/lainamp.ZIP",
					name: "lain 2",
				},
				{
					url: "/webamp/themes/s_Lain_Amp.wsz",
					name: "lain 3",
				},
				{
					url: "/webamp/themes/Angel.wsz",
					name: "angel",
				},
				{
					url: "/webamp/themes/Pretty_Pink_Sakura.wsz",
					name: "sakura kinomoto",
				},
				{
					url: "/webamp/themes/Rei_Ayanami_NGE.wsz",
					name: "rei 1",
				},
				{
					url: "/webamp/themes/rei_moon.wsz",
					name: "rei 2",
				},
				{
					url: "/webamp/themes/Asuka_MysticAMP.wsz",
					name: "asuka",
				},
				{
					url: "/webamp/themes/bd3bf6250ffd41012a07e0601bb0fb4c.wsz",
					name: "parasite eve",
				},
				{
					url: "/webamp/themes/chobits_chii.zip",
					name: "chobits chii",
				}
			],
			initialSkin: {
				url: "/webamp/themes/Rei_Ayanami_NGE.wsz",
			},
			zIndex: 214748364
		});
		const webampElem = document.getElementById("winamp") as HTMLDivElement;
		webamp.renderWhenReady(webampElem).then(() => {
			webampElem.appendChild(
				document.getElementById("webamp") as HTMLDivElement
			);
			// setTimeout(() => {
			// 	webamp.play()
			// }, 2000)
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
