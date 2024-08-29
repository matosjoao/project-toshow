import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ActionDetailPanelState, ArtPanelElement, ArtPanelElementType, FrameImageSrcAction, FrameImageTransformAction, ImageCreationAction, ImageStyleAction, ShapeStyleAction, TemplateKey, TextStyleAction, TransformActionElement, TransformType } from '../types';

interface EditorState {
    scale: number;
    isScaling: boolean;
    framingElementId: string | null;
    shouldUpdateMovableRect: boolean;
    shouldUpdateSelectedElements: boolean;
    width: number;
    height: number;
    templateType: number | null;
    templateKeys: TemplateKey[] ;
    detailPanel: ActionDetailPanelState | null;
    actionsBar: ArtPanelElementType | null;
    transformMode: TransformType;
    panelElements: Array<ArtPanelElement>;
    selectedElement: ArtPanelElement | null;
    draggingImagePreview: ImageCreationAction | null;
}

const initialState: EditorState = {
    scale: 50,
    isScaling: false,
    framingElementId: null,
    shouldUpdateMovableRect: false,
    shouldUpdateSelectedElements: false,
    width: 1024,
    height: 1024,
    templateType: null,
    templateKeys: [],
    detailPanel: null,
    actionsBar: null,
    transformMode: TransformType.SCALE,
    panelElements: [],
    selectedElement: null,
    draggingImagePreview: null,
};
  
export const editorSlice = createSlice({
    name: 'editor',
    initialState,
    reducers: {
        initEditor: (_state, action: PayloadAction<{width: number, height: number, templateType: number, templateKeys: TemplateKey[], elements?: Array<ArtPanelElement>}>) => {
            return {
                ...initialState,
                width: action.payload.width, 
                height: action.payload.height, 
                templateType: action.payload.templateType,
                templateKeys: action.payload.templateKeys,
                panelElements: action.payload.elements || []
            };
        },
        scalePanel: (state, action: PayloadAction<number>) => {
            state.scale = action.payload;
            state.isScaling = true;
        },
        stopScalePanel: (state) => {
            state.isScaling = false;
        },
        toggleIsFraming: (state, action: PayloadAction<string|null>) => {
            state.framingElementId = action.payload;
        },
        setDetailPanel: (state, action: PayloadAction<ActionDetailPanelState | null>) => {
            state.detailPanel = action.payload;
        },
        setSelectedElement: (state, action: PayloadAction<string | null>) => {
            if (!action.payload) {
                state.actionsBar = null;
                state.selectedElement = null;
                state.transformMode = TransformType.SCALE;
            }else {
                const el = state.panelElements.find(e => e.elementId === action.payload);
                
                state.actionsBar = el ? el.type : null;
                state.selectedElement = el ? el : null;
                state.transformMode = (el && (el.type === ArtPanelElementType.TEXT || el.type === ArtPanelElementType.SHAPE)) ? TransformType.RESIZE : TransformType.SCALE;
            }

            state.framingElementId = null;

            if(state.detailPanel?.shouldCloseOnElementChange) state.detailPanel = null;
        },
        addPanelElement: (state, action: PayloadAction<{ajustCenter: boolean, element: ArtPanelElement}>) => {
            if(action.payload.ajustCenter){
                const scaleRatio = 1 / (state.scale / 100);
                action.payload.element.x = (action.payload.element.x * scaleRatio) - (action.payload.element.width / 2);
                action.payload.element.y = (action.payload.element.y * scaleRatio) - (action.payload.element.height / 2);
            }
            state.panelElements.push(action.payload.element);
        },
        deletePanelElements: (state, action: PayloadAction<string[]>) => {
            const elementIdsToDelete = action.payload;
            state.panelElements = state.panelElements.filter(
                element => !elementIdsToDelete.includes(element.elementId)
            );
            
            state.shouldUpdateSelectedElements = true;
            state.actionsBar = null;
            state.selectedElement = null;
            state.transformMode = TransformType.SCALE;
            state.framingElementId = null;
            if(state.detailPanel?.shouldCloseOnElementChange) state.detailPanel = null;
        },
        setTransformById: (state, action: PayloadAction<TransformActionElement>) => {
            const selectedElementIndex = state.panelElements.findIndex(e => e.elementId === action.payload.id);
            
            if(action.payload.transform.x) state.panelElements[selectedElementIndex].x = action.payload.transform.x;
            if(action.payload.transform.y) state.panelElements[selectedElementIndex].y = action.payload.transform.y;
            if(action.payload.transform.width) state.panelElements[selectedElementIndex].width = action.payload.transform.width;
            if(action.payload.transform.height) state.panelElements[selectedElementIndex].height = action.payload.transform.height;
            if(action.payload.transform.rotation) state.panelElements[selectedElementIndex].rotation = action.payload.transform.rotation;
            if(action.payload.transform.scaleX) state.panelElements[selectedElementIndex].scaleX = action.payload.transform.scaleX;
            if(action.payload.transform.scaleY) state.panelElements[selectedElementIndex].scaleY = action.payload.transform.scaleY;

            state.selectedElement = state.panelElements[selectedElementIndex];
        },
        setFrameImage: (state, action: PayloadAction<FrameImageSrcAction>) => {
            const selectedElementIndex = state.panelElements.findIndex(e => e.elementId === action.payload.id);
            if(selectedElementIndex !== -1){
                state.panelElements[selectedElementIndex].frameImage = action.payload.src;
                state.panelElements[selectedElementIndex].frameImageWidth = action.payload.width;
                state.panelElements[selectedElementIndex].frameImageHeight = action.payload.height;
                state.panelElements[selectedElementIndex].frameImageX = 0;
                state.panelElements[selectedElementIndex].frameImageY = 0;
            }
        },
        setFrameImageTransform: (state, action: PayloadAction<FrameImageTransformAction>) => {
            const selectedElementIndex = state.panelElements.findIndex(e => e.elementId === action.payload.id);
            if(selectedElementIndex !== -1) {
                state.panelElements[selectedElementIndex].frameImageWidth = action.payload.width;
                state.panelElements[selectedElementIndex].frameImageHeight = action.payload.height;
                state.panelElements[selectedElementIndex].frameImageX = action.payload.x;
                state.panelElements[selectedElementIndex].frameImageY = action.payload.y;
            }
        },
        setImageStyles: (state, action: PayloadAction<ImageStyleAction>) => {
            const selectedElementIndex = state.panelElements.findIndex(e => e.elementId === state.selectedElement?.elementId);
        
            if(selectedElementIndex !== -1){
                if(action.payload.mixBlendMode) state.panelElements[selectedElementIndex].style = {...state.panelElements[selectedElementIndex].style, mixBlendMode: action.payload.mixBlendMode};
                if(action.payload.opacity) state.panelElements[selectedElementIndex].style = {...state.panelElements[selectedElementIndex].style, opacity: `${action.payload.opacity}%`};
            }
        },
        setShapeStyles: (state, action: PayloadAction<ShapeStyleAction>) => {
            const selectedElementIndex = state.panelElements.findIndex(e => e.elementId === state.selectedElement?.elementId);
            if(selectedElementIndex !== -1){
                if(action.payload.color && action.payload.index != null) {
                    const colors = state.panelElements[selectedElementIndex].shapeColors || [];
                    colors[action.payload.index] = action.payload.color;
                    state.panelElements[selectedElementIndex].shapeColors = colors;
                }
            }
        },
        setDraggingImagePreview: (state, action: PayloadAction<ImageCreationAction | null>) => {
           state.draggingImagePreview = action.payload;
        },
        setTextStyles: (state, action: PayloadAction<TextStyleAction>) => {
            const selectedElementIndex = state.panelElements.findIndex(e => e.elementId === state.selectedElement?.elementId);
            if(selectedElementIndex !== -1){
                state.panelElements[selectedElementIndex].style = {...state.panelElements[selectedElementIndex].style, ...action.payload.styles };
                if(action.payload.width) state.panelElements[selectedElementIndex].width = action.payload.width;
                if(action.payload.height) state.panelElements[selectedElementIndex].height = action.payload.height;

                state.selectedElement = state.panelElements[selectedElementIndex];
                state.shouldUpdateMovableRect = true;
            }
        },
        setText: (state, action: PayloadAction<{text: string, elementId: string}>) => {
            const selectedElementIndex = state.panelElements.findIndex(e => e.elementId === action.payload.elementId);
            if(selectedElementIndex !== -1){
                state.panelElements[selectedElementIndex].text = action.payload.text;

                state.selectedElement = state.panelElements[selectedElementIndex];
                state.shouldUpdateMovableRect = true;
            }
        },
        setColor: (state, action: PayloadAction<string>) => {
            const selectedElementIndex = state.panelElements.findIndex(e => e.elementId === state.selectedElement?.elementId);
            if(selectedElementIndex !== -1){
                state.panelElements[selectedElementIndex].style = {...state.panelElements[selectedElementIndex].style, color: action.payload };
            }
        },
        setMovableReactUpdated: (state) => {
            state.shouldUpdateMovableRect = false;
        },
        setSelectedElementsUpdated: (state) => {
            state.shouldUpdateSelectedElements = false;
        },
        setLayersPositions: (state, action: PayloadAction<{dragOverElemId: string, dragElemId: string}>) => {
            const dragItemIndex = state.panelElements.findIndex(layer => layer.elementId === action.payload.dragElemId);
            const dragOverItemIndex = state.panelElements.findIndex(layer => layer.elementId === action.payload.dragOverElemId);
            if (dragItemIndex >= 0 && dragOverItemIndex >= 0) {
                const draggedItemContent = state.panelElements[dragItemIndex];
                const remainingItems = state.panelElements.filter((_, idx) => idx !== dragItemIndex);

                const newPanelElements = [
                    ...remainingItems.slice(0, dragOverItemIndex),
                    draggedItemContent,
                    ...remainingItems.slice(dragOverItemIndex)
                ];

                state.panelElements = newPanelElements;
            }
        },
        setTemplateKeyId: (state, action: PayloadAction<{elementId: string, templateKeyId: number | null, shouldUpdateSelectedElement: boolean}>) => {
            const selectedElementIndex = state.panelElements.findIndex(e => e.elementId === action.payload.elementId);
            if(selectedElementIndex !== -1) {
                state.panelElements[selectedElementIndex].templateKeyId = action.payload.templateKeyId;
                if(action.payload.shouldUpdateSelectedElement) state.selectedElement = state.panelElements[selectedElementIndex];
            }
        },
    },
});

export const { initEditor, scalePanel, stopScalePanel, toggleIsFraming, setDetailPanel, setSelectedElement, addPanelElement, deletePanelElements, setTransformById, setFrameImage, setFrameImageTransform, setImageStyles, setShapeStyles, setDraggingImagePreview, setTextStyles, setText, setColor, setMovableReactUpdated, setSelectedElementsUpdated, setLayersPositions, setTemplateKeyId } = editorSlice.actions;

export default editorSlice.reducer;
  