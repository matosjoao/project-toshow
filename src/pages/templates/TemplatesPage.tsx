import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getTemplateTypes, TemplateCategoryRow, TemplateGalleryRow } from "../../features/templates";
import { TemplateTypeResponse } from "../../features/templates/types";
import { initEditor } from "../../features/templates/store/editor-slice";

const TemplatesPage: React.FC = () => {
    const { data, isFetching } = useFetch<TemplateTypeResponse[]>(getTemplateTypes, []) ;
    const types = data || [];
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onCreateClickHandler = (width: number, height: number, templateTypeId: number) => {
        const templateType = types.find(type => type.id === templateTypeId);
        if(!templateType) {
            return;
        }
        
        // TODO:: Check if this is the best way to do it
        dispatch(initEditor({width: width, height: height, templateType: templateTypeId, templateKeys: templateType.keys }));
        navigate('create');
    };

    const onDeleteTemplateHandler = (templateId: number) => {
        console.log(templateId);
    };
    
    const onEditTemplateHandler = (templateId: number) => {
        navigate(`${templateId}/edit`);
    };

	return (
        <div className="flex flex-col overflow-y-auto">
            <div className="h-auto flex flex-none flex-col bg-gradient-to-r from-blue-800 to-purple-700 ">
                <h1 className="text-3xl font-semibold my-4 text-center text-white">Que template vamos criar hoje?</h1>
                <TemplateCategoryRow types={types} isFetching={isFetching} onCreateClick={onCreateClickHandler} />
            </div>
            <div className="flex flex-col mx-12">
                { !isFetching && (
                    data?.map( templateType => (
                        <TemplateGalleryRow 
                            key={`template_type_${templateType.id}`} 
                            title={templateType.description} 
                            templates={templateType.templates} 
                            onDeleteTemplate={onDeleteTemplateHandler}
                            onEditTemplate={onEditTemplateHandler} />
                    ))
                ) }
            </div>
        </div>
	);
};

export default TemplatesPage;