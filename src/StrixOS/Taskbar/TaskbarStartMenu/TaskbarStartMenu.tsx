import useClickOutside from "../../../hooks/useClickOutside";
import styles from "./TaskbarStartMenu.module.scss";

interface TaskbarStartMenu {
	toggleStart: () => void;
	closeAll: () => void;
}

const TaskbarStartMenu = ({ toggleStart, closeAll }: TaskbarStartMenu) => {
	const ref = useClickOutside<HTMLUListElement>(toggleStart, ["start-btn"]);

	return (
		<ul ref={ref} className={styles["menu"]}>
			{buttons.map((button) => (
				<li key={button.name}>
					<button
						onClick={() => {
							toggleStart();
							button.onClick(closeAll);
						}}
					>
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
		onClick: (closeAll: () => void) => {
			const root = document.getElementById("root")!;
			closeAll();
			root.style.transition = "all .7s ease-in";
			root.style.opacity = "0";
			root.style.transform = "scale(0)";
			window.webamp.close()
		},
	},
	{
		name: "Restart",
		onClick: () => {
			window.location.reload();
		},
	},
	{
		name: "Contact",
		onClick: () => {
			window.open('https://discord.com/users/207285913850609664', '_blank')
		},
	},
	{
		name: "Source Code",
		onClick: () => {
			window.open("https://github.com/StrixWL/1337-os", "_blank");
		},
	},
	{
		name: "1337 Coding School",
		onClick: () => {
			window.open("https://1337.ma/en/", "_blank");
		},
	},
];

export default TaskbarStartMenu;
