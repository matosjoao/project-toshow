
import ReactDOMServer from 'react-dom/server';
import { ArtPanelElementType } from '../types';
import { FrameElement, FrameElementLayer, ImageElement, ImageElementLayer, ShapeElement, ShapeElementLayer, TextElement, TextElementLayer } from '../components/editor/elements';

export const getElementComponentLayer = (type: ArtPanelElementType) => {
    switch (type) {
        case ArtPanelElementType.IMAGE:
            return ImageElementLayer;
        case ArtPanelElementType.TEXT:
            return TextElementLayer;
        case ArtPanelElementType.FRAME:
            return FrameElementLayer;
        case ArtPanelElementType.SHAPE:
            return ShapeElementLayer;
        default:
            return null;
    }
};

export const getElementComponent = (type: ArtPanelElementType) => {
    switch (type) {
        case ArtPanelElementType.IMAGE:
            return ImageElement;
        case ArtPanelElementType.TEXT:
            return TextElement;
        case ArtPanelElementType.FRAME:
            return FrameElement;
        case ArtPanelElementType.SHAPE:
            return ShapeElement;
            
        default:
            return null;
    }
};

export const renderToHtml = (node: React.ReactNode) => {
    const componentHtml = ReactDOMServer.renderToString(node);
    return componentHtml;
};