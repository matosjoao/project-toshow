import { FetchResultType } from "../../../hooks/useFetch";
import fetchApi from "../../../lib/fetch";
import { ArtPanelElement, TemplateKey } from "../types";

type DataResponse = {
    id: number,
    width: number, 
    height: number,
    templateType: number,
    templateKeys: TemplateKey[],
    elements: ArtPanelElement[],
}

const getTemplate = async (id: string) => {
    const response = await fetchApi<FetchResultType<DataResponse>>(`templates/${id}`);

    return response.data;
};

export default getTemplate;