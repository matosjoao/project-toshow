import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { useState } from "react";
import { EDITOR_ACTIONS_BARS, EDITOR_ACTIONS_PANELS } from "../../config";
import { ActionDetailPanelState, ActionDetailPanelType } from "../../types";
import { getElementComponent, renderToHtml } from "../../utils/editor";
import { setDetailPanel } from "../../store/editor-slice";
import { toastError, toastSuccess } from "../../../../utils/toast";
import BarButton from "./action-top-bar/BarButton";
import BarDivider from "./action-top-bar/BarDivider";
import createTemplate from "../../services/createTemplate";

const EditorTopBar: React.FC = () => {
    const dispatch = useAppDispatch();
    const currentBar = useAppSelector((state) => state.editor.actionsBar);
    const panelElements = useAppSelector((state) => state.editor.panelElements);
    const width = useAppSelector((state) => state.editor.width);
    const height = useAppSelector((state) => state.editor.height);
    const templateType = useAppSelector((state) => state.editor.templateType);
    const navigate = useNavigate();
    const [isSaving, setIsSaving] = useState(false);

    const onLayerChangeHandler = () => {
        const panel = EDITOR_ACTIONS_PANELS.find(panel => panel.type === ActionDetailPanelType.PanelLayer); 
        if(panel){
            const panelState: ActionDetailPanelState = { type: panel.type, shouldCloseOnElementChange: panel.shouldCloseOnElementChange };
            dispatch(setDetailPanel(panelState));
        } 
    };

    const onSaveHandler = async () => {
        try {
            // TODO:: Remove, its done on server side
            const nodes = panelElements.map(element => { 
                const Element = getElementComponent(element.type);
                return Element ? <Element key={element.elementId} element={element} /> : null;
            });
            const parentNode = (<div style={{position: 'relative', overflow: 'hidden', width: `${width}px`, height: `${height}px`}}>{nodes}</div>);
            const html = renderToHtml(parentNode);
            setIsSaving(true);
            const result = await createTemplate({description: 'Template 1', width: width, height: height, templateType: templateType || 1, template: html, elements: panelElements});
            
            toastSuccess(result.message, () => {
                navigate("/templates");
            });
        } catch (error) {
            setIsSaving(false);
            if (error instanceof Error) {
                toastError(error.message);
            } else {
                toastError("Ocurreu um erro ao gravar o template, por favor tente mais tarde ou contacte o administrador.");
            }
        }
    };

    return (
        <div className="flex bg-white h-16">
            { EDITOR_ACTIONS_BARS.map(bar => currentBar == bar.type && <bar.component key={bar.id} />)}
            <div className="flex items-center">
                {currentBar != null && <BarDivider/>}
                <BarButton onClick={onLayerChangeHandler}>Posição</BarButton>
                <BarDivider/>
                <BarButton>Tamanho</BarButton>
            </div>
            <div className="flex flex-1 items-center justify-end">
                <BarButton onClick={onSaveHandler} disabled={isSaving}>{isSaving ? 'A guardar...' : 'Guardar'}</BarButton>
            </div>
        </div>
	);
};

export default EditorTopBar;