import useClickOutside from "../../../hooks/useClickOutside";
import styles from "./TaskbarStartMenu.module.scss";

interface TaskbarStartMenu {
	toggleStart: () => void;
}

const TaskbarStartMenu = ({ toggleStart }: TaskbarStartMenu) => {
	const ref = useClickOutside<HTMLUListElement>(toggleStart, ["start-btn"])

	return (
		<ul ref={ref} className={styles["menu"]}>
			{buttons.map((button) => (
				<li key={button.name}>
					<button onClick={() => {
						toggleStart()
						button.onClick()
					}}>
						<span>{button.name}</span>
					</button>
				</li>
			))}
		</ul>
	);
};

const buttons = [
	{
		name: "Shut Down",
		onClick: () => {},
	},
	{
		name: "Restart",
		onClick: () => {},
	},
	{
		name: "Programs",
		onClick: () => {},
	},
	{
		name: "Source Code",
		onClick: () => {},
	},
];

export default TaskbarStartMenu;
