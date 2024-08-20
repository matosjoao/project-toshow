interface EditorColorsConfig {
    leftBar: string;
    leftBarButtonText: string;
    leftBarButtonTextHover: string;
    panel: string;
    panelTitleColor: string;
    panelTitleBorderColor: string;
    bottomBar: string;
}

export const EDITOR_COLORS_CONFIG: EditorColorsConfig = {
    leftBar: 'bg-gradient-to-b from-blue-800 to-purple-700',
    leftBarButtonText: 'text-white',
    leftBarButtonTextHover: '',
    panel: 'bg-white',
    panelTitleColor: 'text-gray-800',
    panelTitleBorderColor: 'border-gray-800',
    bottomBar: 'bg-white',
};

interface ActionButtonType {
	label: string;
	icon: React.ReactNode;
	panelType: ActionDetailPanelType;
}

export const EDITOR_ACTIONS_BUTTONS: ActionButtonType[] = [
    { label: 'Template', icon: TemplateIcon, panelType: ActionDetailPanelType.PanelTemplate },
    { label: 'Galeria', icon: GalleryIcon, panelType: ActionDetailPanelType.PanelGallery },
    { label: 'Texto', icon: TextIcon, panelType: ActionDetailPanelType.PanelText },
    { label: 'Formas', icon: ShapeIcon, panelType: ActionDetailPanelType.PanelShape },
    { label: 'Imagens', icon: ImageIcon, panelType: ActionDetailPanelType.PanelImage },
    { label: 'Frames', icon: FrameIcon, panelType: ActionDetailPanelType.PanelFrame },
    { label: 'Carregados', icon: UploadIcon, panelType: ActionDetailPanelType.PanelUpload }
];

export const EDITOR_ACTIONS_PANELS: ActionDetailPanel[] = [
    { id: 'template', type: ActionDetailPanelType.PanelTemplate, component: PanelTemplate, shouldCloseOnElementChange: false },
    { id: 'gallery', type: ActionDetailPanelType.PanelGallery, component: PanelGallery, shouldCloseOnElementChange: false },
    { id: 'text', type: ActionDetailPanelType.PanelText, component: PanelText, shouldCloseOnElementChange: false },
    { id: 'shape', type: ActionDetailPanelType.PanelShape, component: PanelShape, shouldCloseOnElementChange: false },
    { id: 'image', type: ActionDetailPanelType.PanelImage, component: PanelImage, shouldCloseOnElementChange: false },
    { id: 'frame', type: ActionDetailPanelType.PanelFrame, component: PanelFrame, shouldCloseOnElementChange: false },
    { id: 'upload', type: ActionDetailPanelType.PanelUpload, component: PanelUpload, shouldCloseOnElementChange: false },
    { id: 'color', type: ActionDetailPanelType.PanelColor, component: PanelColor, shouldCloseOnElementChange: true },
    { id: 'image-settings', type: ActionDetailPanelType.PanelImageSettings, component: PanelImageSettings, shouldCloseOnElementChange: true },
    { id: 'text-settings', type: ActionDetailPanelType.PanelTextSettings, component: PanelTextSettings, shouldCloseOnElementChange: true },
    { id: 'layers', type: ActionDetailPanelType.PanelLayer, component: PanelLayers, shouldCloseOnElementChange: false },
    { id: 'template-keys', type: ActionDetailPanelType.PanelTemplateKeys, component: PanelTemplateKeys, shouldCloseOnElementChange: true },
];

export const EDITOR_ACTIONS_PANEL_TEXT: ActionDetailPanelText[] = [
    { id: 'h1', title: 'Adicionar um Título', className: 'text-2xl', action: { text: 'Adicionar um Título', size: 68, width: 700, height: 100} },
    { id: 'h3', title: 'Adicionar um Subtítulo', className: 'text-md', action: { text: 'Adicionar um Subtítulo', size: 38, width: 500, height: 70 } },
    { id: 'p', title: 'Adicionar texto de corpo', className: 'text-xs', action: { text: 'Adicionar texto de corpo', size: 26, width: 360, height: 50 } }
];

export const EDITOR_ACTIONS_PANEL_SHAPE = [
    {id: 'rect' , clipPath: 'path("M 18.56 0 L 45.44 0 L 64 18.56 L 64 45.44 L 45.44 64 L 18.56 64 L 0 45.44 L 0 18.56 L 18.56 0")'}
];

export const EDITOR_ACTIONS_PANEL_DEFAULT_COLORS: ActionDetailPanelColor[] = [
    { id: 'color-1', color: '#000000' },
    { id: 'color-2', color: '#737373' },
    { id: 'color-3', color: '#a6a6a6' },
    { id: 'color-4', color: '#d9d9d9' },
    { id: 'color-5', color: '#ffffff' },
];

interface ActionTopBar {
	id: string;
    type: ArtPanelElementType;
	component: React.FC;
}

export const EDITOR_ACTIONS_BARS: ActionTopBar[] = [
    { id: 'image', type: ArtPanelElementType.IMAGE, component: BarImage },
    { id: 'shape', type: ArtPanelElementType.SHAPE, component: BarShape },
    { id: 'text', type: ArtPanelElementType.TEXT, component: BarText },
];