import { FetchQueryType, FetchResultType } from "../../../hooks/useFetch";
import fetchApi from "../../../lib/fetch";
import { ShapeResponse } from "../types";

const getEditorShapes = async (params?: FetchQueryType) => {
    const page = params ? params.page : 1;
    let url = `shapes?page=${page}`;
    if (params && params.q) {
        url += `&query=${encodeURIComponent(params.q)}`;
    }
    
    const response = await fetchApi<FetchResultType<ShapeResponse[]>>(url);

    return response.data;
};

export default getEditorShapes;