import FrameElement from "../components/editor/elements/frame/FrameElement";
import FrameElementLayer from "../components/editor/elements/frame/FrameElementLayer";
import FrameElementRender from "../components/editor/elements/frame/FrameElementRender";
import ImageElement from "../components/editor/elements/image/ImageElement";
import ImageElementLayer from "../components/editor/elements/image/ImageElementLayer";
import ImageElementRender from "../components/editor/elements/image/ImageElementRender";
import ShapeElement from "../components/editor/elements/shape/ShapeElement";
import ShapeElementLayer from "../components/editor/elements/shape/ShapeElementLayer";
import ShapeElementRender from "../components/editor/elements/shape/ShapeElementRender";
import TextElement from "../components/editor/elements/text/TextElement";
import TextElementLayer from "../components/editor/elements/text/TextElementLayer";
import TextElementRender from "../components/editor/elements/text/TextElementRender";
import { ArtPanelElementType } from "../components/editor/elements/type";
import ReactDOMServer from 'react-dom/server';

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

export const getElementComponent = (type: ArtPanelElementType, render: boolean = false) => {
    switch (type) {
        case ArtPanelElementType.IMAGE:
            return render ? ImageElementRender : ImageElement;
        case ArtPanelElementType.TEXT:
            return render ? TextElementRender : TextElement;
        case ArtPanelElementType.FRAME:
            return render ? FrameElementRender : FrameElement;
        case ArtPanelElementType.SHAPE:
            return render ? ShapeElementRender : ShapeElement;
            
        default:
            return null;
    }
};

export const renderToHtml = (node: React.ReactNode) => {
    const componentHtml = ReactDOMServer.renderToString(node);
    return componentHtml;
};