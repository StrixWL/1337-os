export type App = "TOF" | "PAINT" | "WINAMP" | "CALCULATOR" | "MINESWEEPER"

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

export interface DragState {
	startPos: Pos;
	endPos: Pos;
	isDragging: boolean;
}

export interface WindowProps {
	id?: number;
	zIndex?: number;
	backgroundColor?: string;
	resizeOffset?: number;
	dragOffset?: number;
	height?: number;
	width?: number;
	minWidth?: number;
	minHeight?: number;
	focus?: () => void;
    focused?: boolean;
	deleteSelf?: () => void;
	minimizeSelf?: () => void;
	title?: string;
	iconUrl?: string;
	name?: string;
	Component?: ({}: {close?: () => void}) => JSX.Element;
	removeHeader?: boolean;
	unique?: boolean;
	resizable?: boolean;
	minimized?: boolean;
}

export interface Windows {
	[key: number]: WindowProps;
	currentId: number;
	currentZIndex: number;
	focus: number | null;
}