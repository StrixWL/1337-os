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
                    const newZIndex = systemState.currentZIndex
                    setSystemState({
						...systemState,
						currentZIndex: systemState.currentZIndex + 1,
					});
					return {
                        ...state,
                        [action.props.id!]: {
                            ...state[action.props.id!],
                            zIndex: newZIndex
                        }
                    }
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
                            backgroundColor: 'rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')'
						},
					});
				}}
			>
				ADD
			</button>
			{Object.keys(windows).map((key: string, index: number) => {
				const window = windows[parseInt(key)];
				return <Window key={index} {...window} focus={() => dispatch({
                    type: "FOCUS",
                    props: {id: window.id}
                })} />;
			})}
			<Desktop />
			<Taskbar />
		</div>
	);
};

export default StrixOS;
