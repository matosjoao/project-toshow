import { FetchResultType } from "../../../hooks/useFetch";
import fetchApi from "../../../lib/fetch";
import { generateUUID } from "../../../utils/random";
import { ArtPanelElement, TemplateKey } from "../types";

type DataRequest = {
    id: string,
    generateIds: boolean
}

type DataResponse = {
    id: number,
    width: number, 
    height: number,
    templateType: number,
    templateKeys: TemplateKey[],
    elements: ArtPanelElement[],
}

const getTemplate = async (params: DataRequest) => {
    if (!params) {
        throw new Error('Invalid id.');
    }
    
    const response = await fetchApi<FetchResultType<DataResponse>>(`templates/${params.id}`);

    if(params.generateIds) {
        const elements = [...response.data.data.elements];
        elements.forEach(element => {
            const id = generateUUID();
            element.elementId = id || element.id;
        });

        response.data.data.elements = elements;
    }

    return response.data;
};

export default getTemplate;