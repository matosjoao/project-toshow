import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { EDITOR_ACTIONS_BUTTONS, EDITOR_ACTIONS_PANELS } from "../../config";
import { setDetailPanel } from "../../store/editor-slice";
import { ActionDetailPanelState, ActionDetailPanelType } from "../../types";
import ActionButton from "./action-bar/ActionButton";


const EditorLeftPanel: React.FC = () => {
    const currentDetailPanel = useAppSelector((state) => state.editor.detailPanel);
    const dispatch = useAppDispatch();

    const onActionButtonClickHandler = (panelType: ActionDetailPanelType) => {
        const panel = EDITOR_ACTIONS_PANELS.find(p => p.type === panelType);
        if(panel){
            const panelState: ActionDetailPanelState = { type: panel.type, shouldCloseOnElementChange: panel.shouldCloseOnElementChange };
            dispatch(setDetailPanel(panelState));
        }
    };

    const onActionDetailPanelCloseHandler = () => {
        dispatch(setDetailPanel(null));
    };

    return (
        <div className="hidden md:flex">
            <div className="flex flex-col w-28 pt-2 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 overflow-y-auto overflow-x-hidden bg-gradient-to-b from-blue-800 to-purple-700">
                { EDITOR_ACTIONS_BUTTONS.map(button => {
                    return (
                        <ActionButton 
                            key={button.label} 
                            onClick={() => onActionButtonClickHandler(button.panelType)} 
                            icon={button.icon}> 
                            {button.label}
                        </ActionButton>
                    );
                }) }
            </div>
            { EDITOR_ACTIONS_PANELS.map(panel => currentDetailPanel?.type == panel.type && <panel.component key={panel.id} onClose={onActionDetailPanelCloseHandler}/>)}
        </div>
	);
};

export default EditorLeftPanel;