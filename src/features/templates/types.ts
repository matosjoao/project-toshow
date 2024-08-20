import { CSSProperties, FC } from "react";

export type TemplateType = {
    id: number,
    name: string,
    description: string,
    keys: TemplateKey[],
}

export type TemplateKey = {
    id: number,
    name: string,
    replaceColumn: string,
    format: number,
}

export type Template = {
    id: number,
    description: string,
    image: string,
    thumbnail: string,
    width: number,
    height: number,
}

export type {DataResponse as TemplateTypeResponse } from './services/getTemplateTypes';

export type FrameResponse = {
	id: string,
	image: string,
	clipPath: string,
    width: number,
    height: number,
}

export type ImageResponse = {
	id: string,
    width: number,
    height: number,
    alt: string,
    thumb: string,
	full: string,
	username: string,
	name: string,
}

export type ShapeResponse = {
	id: string,
	image: string,
	width: number,
    height: number,
}

export type ShapeFileResponse = {
	file: string,
}

export type FontResponse = {
	name: string,
	variants: string[],
	subsets: string[],
}

export type UserImageResponse = {
	id: string,
	image: string,
	thumb: string,
	width: number,
    height: number,
}

export type ImageUploadResponse = {
	message?: string,
	image?: UserImageResponse,
}

/**
 * Action Detail Panel Types
 */
export enum MixBlendMode {
    NORMAL = 'normal',
    MULTIPLY = 'multiply',
    SCREEN = 'screen',
    OVERLAY = 'overlay',
    DARKEN = 'darken',
    LIGHTEN = 'lighten',
    COLOR_DODGE = 'color-dodge',
    COLOR_BURN = 'color-burn',
    HARD_LIGHT = 'hard-light',
    SOFT_LIGHT = 'soft-light',
    DIFFERENCE = 'difference',
    EXCLUSION = 'exclusion',
    HUE = 'hue',
    SATURATION = 'saturation',
    COLOR = 'color',
    LUMINOSITY = 'luminosity'
}

export enum ActionDetailPanelType {
    PanelTemplate,
    PanelTemplateKeys,
    PanelGallery,
    PanelText,
    PanelTextSettings,
    PanelShape,
    PanelImage,
    PanelFrame,
    PanelUpload,
    PanelColor,
    PanelImageSettings,
    PanelLayer,
}

export enum ActionDetailDataTransferType {
    PanelText,
    PanelShape,
    PanelImage,
    PanelFrame,
}

export interface ActionDetailPanel {
	id: string;
    type: ActionDetailPanelType;
	component: FC<ActionDetailPanelProps>;
    shouldCloseOnElementChange: boolean;
}

export interface ActionDetailPanelState<G = object> {
    type: ActionDetailPanelType;
    shouldCloseOnElementChange: boolean;
    data?: G;
}

export interface ActionDetailPanelProps {
    onClose: () => void;
}

/**
 * Elements Types
 */
export enum ArtPanelElementType {
    TEXT,
    IMAGE,
    FRAME,
    SHAPE
}

export interface ArtPanelElement {
    id: string;
    elementId: string;
    type: ArtPanelElementType;
    templateKeyId?: number | null;
    x: number;
    y: number;
    width: number;
    height: number;
    rotation?: number;
    scaleX?: number;
    scaleY?: number;
    text?: string;
    src?: string; // Applied to images 
    frameImage?: string; // Applied to frames
    frameImageWidth?: number; // Applied to frames
    frameImageHeight?: number; // Applied to frames
    frameImageX?: number; // Applied to frames
    frameImageY?: number;// Applied to frames
    frameClipPath?: string; // Applied to frames
    shapeSvg?: string; // Applied to shapes
    shapeColors?: string[]; // Applied to shapes could have one or more colors available to change
    style?: CSSProperties;
}

/**
 * Art Panel Types
 */
export enum TransformType {
    RESIZE,
    SCALE,
    WARP,
}

export interface EventSendDataType<G> {
    type: ActionDetailDataTransferType;
    data: G;
}

export interface TransformAction {
	x?: number;
    y?: number;
    width?: number;
    height?: number;
    rotation?: number;
    scaleX?: number;
    scaleY?: number;
}

export interface TransformActionElement {
	id: string;
    transform: TransformAction;
}

export interface FrameImageSrcAction {
	id: string;
    src: string;
    width: number;
    height: number;
}

export interface FrameImageTransformAction {
    id: string;
	x: number;
    y: number;
    width: number;
    height: number;
}

export interface ImageStyleAction {
    mixBlendMode?: MixBlendMode;
    opacity?: number;
}

export interface ShapeStyleAction {
    color?: string;
    index?: number;
}