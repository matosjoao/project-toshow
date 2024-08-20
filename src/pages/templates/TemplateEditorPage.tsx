import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initEditor } from "../../features/templates/store/editor-slice";
import { useParams } from "react-router-dom";
import ArtPanel from "../../components/editor/art-panel/ArtPanel";
import EditorBottomBar from "../../components/editor/EditorBottomBar";
import EditorLeftPanel from "../../features/templates/components/editor/EditorLeftPanel";
import EditorTopBar from "../../components/editor/EditorTopBar";


const EditorPage: React.FC = () => {
    const params = useParams();
    const dispatch = useDispatch();
    //const { data, isFetching } = useFetch<TemplateResponse, TemplateRequest>(getTemplateWithParams, initialState, false) ;

    /* useEffect(() => {

        async function fetchTemplate(id: string) {
            try {
              const { data } = await getTemplate({id: id, generateIds: true});
              dispatch(initEditor({width: data.width, height: data.height, templateType: data.templateType, templateKeys: data.templateKeys, elements: data.elements }));
            } catch (error) {
              console.log(error);
            }
        }
      
        if(params.templateId) {
            fetchTemplate(params.templateId);
        }

    }, [dispatch, params]); */

	return (
		<div className="flex flex-grow overflow-hidden">
            
            <EditorLeftPanel />

            <div className="flex flex-col flex-grow bg-gray-200">
                <EditorTopBar />

                <div className="flex relative h-full overflow-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
                    <div className="absolute flex min-w-full min-h-full">
                        {/* <div className="relative flex flex-grow touch-pinch-zoom">  */}
                            <div className="flex relative justify-center m-auto p-10">
                                <div className="ml-10">
                                    <ArtPanel />
                                </div>
                                <div className="w-10"></div>
                            </div>
                        {/* </div> */}
                    </div>
                </div>

                <EditorBottomBar />
            </div>
        </div>
	);

	// TODO:: Delete this and the editor component
	/* return <Editor />; */
};

export default EditorPage;