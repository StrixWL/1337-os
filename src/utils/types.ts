import { ReactNode } from "react";

export interface Pos {
	x: number;
	y: number;
}

export interface Sizes {
	left: number;
	top: number;
	width: number;
	height: number;
}

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
	icon?: ReactNode;
	title?: string;
	component?: ReactNode;
}
