import fetchApi from "../../../lib/fetch";
import { ArtPanelElement } from "../types";

type DataRequest = {
    description: string,
    width: number, 
    height: number,
    templateType: number,
    template: string, 
	elements: ArtPanelElement[],
}

type DataResponse = {
    message: string,
    template: {
        id: number,
    }, 
}

const createTemplate = async (data: DataRequest) => {
    const response = await fetchApi<DataResponse>('templates', { 
        method: 'POST',
        body: JSON.stringify(data)
    });

    return response.data;
};

export default createTemplate;