import { useReducer } from "react";
import Desktop from "./Desktop";
import Taskbar from "./Taskbar";
import Window from "./Window";
import { App, WindowProps } from "../utils/types";
import Apps from "../apps";
import { Windows } from "../utils/types";

interface WindowsAction {
	type: string;
	props: WindowProps;
}

const reducer = (state: Windows, action: WindowsAction): Windows => {
	switch (action.type) {
		case "ADD":
			let unique = false
			let id = 0
			if (action.props.unique) {
				Object.keys(state).forEach((key: string) => {
					const window = state[parseInt(key)];
					if (!window) return;
					if (window.title == action.props.title) {
						unique = true
						id = window.id!
					}
				})
			}
			if (unique) {
				const newZIndex = state.currentZIndex;
				return {
					...state,
					currentZIndex: state.currentZIndex + 1,
					focus: id!,
					[id]: {
						...state[id!],
						zIndex: newZIndex,
					},
				};
			}
			const newState = {
				...state,
				currentId: state.currentId + 1,
				currentZIndex: state.currentZIndex + 1,
				focus: state.currentId,
				[state.currentId]: {
					...action.props,
					zIndex: state.currentZIndex,
					id: state.currentId,
				},
			};
			return newState;
		case "FOCUS":
			const newZIndex = state.currentZIndex;
			return {
				...state,
				currentZIndex: state.currentZIndex + 1,
				focus: action.props.id!,
				[action.props.id!]: {
					...state[action.props.id!],
					zIndex: newZIndex,
				},
			};
		case "DELETE":
			const _newState = { ...state };
			delete _newState[action.props.id!];
			return _newState;
	}
	return { ...state };
};

const StrixOS = () => {
	const [windows, dispatch] = useReducer(reducer, {
		currentZIndex: 1,
		currentId: 0,
		focus: null,
	});
	const launchApp = (name: App) => {
		dispatch({
			type: "ADD",
			props: Apps[name],
		});
	};
	const focusWindow = (id: number) => {
		dispatch({
			type: "FOCUS",
			props: { id },
		});
	};
	return (
		<div
			style={{
				height: "100vh",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<Desktop launchApp={launchApp}>
				{Object.keys(windows).map((key: string) => {
					const window = windows[parseInt(key)];
					if (!window) return null;
					return (
						<Window
							key={window.id}
							{...window}
							focused={window.id == windows.focus}
							focus={() => focusWindow(window.id!)}
							deleteSelf={() =>
								dispatch({
									type: "DELETE",
									props: { id: window.id },
								})
							}
						/>
					);
				})}
			</Desktop>
			<Taskbar windows={windows} focusWindow={focusWindow} />
		</div>
	);
};

export default StrixOS;
