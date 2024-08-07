import Webamp from "webamp";

export type App = "PAINT" | "WINAMP" | "STRIXOS" | "CALCULATOR" | "MINESWEEPER" | "VIRUS"

declare global {
    interface Window {
        webamp: Webamp;
    }
}

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
	Component?: ({}: {close?: () => void, minimize?: () => void}) => JSX.Element;
	removeHeader?: boolean;
	unique?: boolean;
	resizable?: boolean;
	maximized?: boolean;
	minimized?: boolean;
}

export interface Windows {
	[key: number]: WindowProps;
	currentId: number;
	currentZIndex: number;
	focus: number | null;
}