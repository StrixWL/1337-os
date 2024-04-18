import { ReactNode } from "react";

export interface WindowProps {
	id?: number;
	zIndex?: number;
	backgroundColor?: string;
	resizeOffset?: number;
	dragOffset?: number;
	minWidth?: number;
	minHeight?: number;
	focus?: () => void;
    focused?: boolean;
	deleteSelf?: () => void;
	component?: ReactNode;
}
