import { useEffect, useReducer, useState } from "react";
import Desktop from "../Desktop/Desktop";
import Taskbar from "../Taskbar/Taskbar";
import Window from "../Window/Window";
import styles from "./StrixOS.module.scss";
import { WindowProps } from "../../utils/types";

interface WindowsAction {
	type: string;
	props: WindowProps;
}

interface Windows {
	[key: number]: WindowProps;
}

interface SystemState {
	currentId: number;
	currentZIndex: number;
}

const StrixOS = () => {
	const [systemState, setSystemState] = useState<SystemState>({
		currentZIndex: 1,
		currentId: 0,
	});
	const [windows, dispatch] = useReducer(
		(state: Windows, action: WindowsAction): Windows => {
			switch (action.type) {
				case "ADD":
					const newState = {
						...state,
						[systemState.currentId]: {
							...action.props,
							zIndex: systemState.currentZIndex,
							id: systemState.currentId,
						},
					};
					setSystemState({
						...systemState,
						currentId: systemState.currentId + 1,
						currentZIndex: systemState.currentZIndex + 1,
					});
					return newState;
				case "FOCUS":
					const newZIndex = systemState.currentZIndex;
					setSystemState({
						...systemState,
						currentZIndex: systemState.currentZIndex + 1,
					});
					return {
						...state,
						[action.props.id!]: {
							...state[action.props.id!],
							zIndex: newZIndex,
						},
					};
				case "DELETE":
					console.log("deleting", action.props.id!);
					const _newState = { ...state };
					delete _newState[action.props.id!];
					return _newState;
			}
			return { ...state };
		},
		{}
	);
	useEffect(() => {
		console.log(windows);
	}, [windows]);
	return (
		<div className={styles["StrixOS"]}>
			<button
				onClick={() => {
					dispatch({
						type: "ADD",
						props: {
							children: (
								<iframe
									src="https://mycv.strix.moe/ToF_Clone/"
									frameBorder="0"
									title="paint"
									style={{
										display: "block",
										width: "100%",
										height: "100%",
										backgroundColor: "white",
									}}
								/>
							),
							backgroundColor:
								"rgb(" +
								Math.floor(Math.random() * 256) +
								"," +
								Math.floor(Math.random() * 256) +
								"," +
								Math.floor(Math.random() * 256) +
								")",
						},
					});
				}}
			>
				ToF
			</button>
            <button
				onClick={() => {
					dispatch({
						type: "ADD",
						props: {
							children: (
								<iframe
									src="https://jspaint.app"
									frameBorder="0"
									title="paint"
									style={{
										display: "block",
										width: "100%",
										height: "100%",
										backgroundColor: "rgb(192,192,192)",
									}}
								/>
							),
							backgroundColor:
								"rgb(" +
								Math.floor(Math.random() * 256) +
								"," +
								Math.floor(Math.random() * 256) +
								"," +
								Math.floor(Math.random() * 256) +
								")",
						},
					});
				}}
			>
				Paint
			</button><button
				onClick={() => {
					dispatch({
						type: "ADD",
						props: {
							children: (
								<iframe
									src="https://react-ecommerce.strix.moe/"
									frameBorder="0"
									title="paint"
									style={{
										display: "block",
										width: "100%",
										height: "100%",
										backgroundColor: "white",
									}}
								/>
							),
							backgroundColor:
								"rgb(" +
								Math.floor(Math.random() * 256) +
								"," +
								Math.floor(Math.random() * 256) +
								"," +
								Math.floor(Math.random() * 256) +
								")",
						},
					});
				}}
			>
				Ecommerce
			</button>
			{Object.keys(windows).map((key: string) => {
				const window = windows[parseInt(key)];
				return (
					<Window
						key={window.id}
						{...window}
						focus={() =>
							dispatch({
								type: "FOCUS",
								props: { id: window.id },
							})
						}
						deleteSelf={() =>
							dispatch({
								type: "DELETE",
								props: { id: window.id },
							})
						}
					/>
				);
			})}
			<Desktop />
			<Taskbar />
		</div>
	);
};

export default StrixOS;
