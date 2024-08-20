import { FetchQueryType, FetchResultType } from "../../../hooks/useFetch";
import fetchApi from "../../../lib/fetch";
import { FrameResponse } from "../types";

const getEditorFrames = async (params?: FetchQueryType) => {
    const page = params ? params.page : 1;
    let url = `frames?page=${page}`;
    if (params && params.q) {
        url += `&query=${encodeURIComponent(params.q)}`;
    }
    
    const response = await fetchApi<FetchResultType<FrameResponse[]>>(url);

    return response.data;
};

export default getEditorFrames;
