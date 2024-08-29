import { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { scalePanel, stopScalePanel } from "../../store/editor-slice";


const EditorBottomBar: React.FC = () => {
    const scale = useAppSelector((state) => state.editor.scale);
    const dispatch = useAppDispatch();

    const onScaleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(scalePanel(Number(event.target.value)));
    };

    const onStopScaleHandler = () => {
        dispatch(stopScalePanel());
    };

    return (
        <div className="hidden md:flex items-center justify-center p-6 bg-white h-16">
            <p className="text-sm font-bold text-center">Page 1</p>
            <div className="flex flex-grow items-center justify-end">
                <input type="range" min="20" max="200" value={scale} onChange={onScaleHandler} onMouseUp={onStopScaleHandler} className="w-32 h-2 rounded mr-2 bg-gray-200 appearance-none cursor-pointer" />
                <p className="w-12 text-sm font-bold bg-gray-200 text-center cursor-pointer rounded">{scale}%</p>
            </div>
        </div>
	);
};

export default EditorBottomBar;