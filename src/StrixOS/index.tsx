import { useEffect, useReducer } from "react";
import Desktop from "./Desktop";
import Taskbar from "./Taskbar";
import Window from "./Window";
import { App, WindowProps } from "../utils/types";
import { Paint, ToF } from "../apps";

interface WindowsAction {
	type: string;
	props: WindowProps;
}

interface Windows {
	[key: number]: WindowProps;
	currentId: number;
	currentZIndex: number;
	focus: number | null;
}

const reducer = (state: Windows, action: WindowsAction): Windows => {
	switch (action.type) {
		case "ADD":
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
			console.log("deleting", action.props.id!);
			const _newState = { ...state };
			delete _newState[action.props.id!];
			return _newState;
	}
	return { ...state };
}

const StrixOS = () => {
	const [windows, dispatch] = useReducer(reducer,
		{
			currentZIndex: 1,
			currentId: 0,
			focus: null,
		}
	);
	const launchApp = (name: App) => {
		switch (name) {
			case "PAINT":
				dispatch({
					type: "ADD",
					props: Paint,
				});
				break ;
			case "TOF":
				dispatch({
					type: "ADD",
					props: ToF,
				});
		}
	}
	return (
		<div style={{
			height: '100vh',
			display: 'flex',
			flexDirection: 'column'
		}}>
			<Desktop launchApp={launchApp}>
				{Object.keys(windows).map((key: string) => {
					const window = windows[parseInt(key)];
					if (!window)
						return null;
					return (
						<Window
							key={window.id}
							{...window}
							focused={window.id == windows.focus}
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
			</Desktop>
			<Taskbar />
		</div>
	);
};

export default StrixOS;
