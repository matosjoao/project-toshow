import { FetchResultType } from "../../../hooks/useFetch";
import fetchApi from "../../../lib/fetch";
import { Template, TemplateKey } from "../types";

export type DataResponse = {
    id: number,
    name: string,
    description: string,
    keys: TemplateKey[],
    templates: Template[],
}

const getTemplateTypes = async () => {
    const response = await fetchApi<FetchResultType<DataResponse[]>>('template-types');

    return response.data;
};

export default getTemplateTypes;