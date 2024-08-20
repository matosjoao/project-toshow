import { FetchQueryType, FetchResultType } from "../../../hooks/useFetch";
import fetchApi from "../../../lib/fetch";
import { UserImageResponse } from "../types";

const getEditorImages = async (params?: FetchQueryType) => {
    const page = params ? params.page : 1;
    let url = `images?page=${page}`;
    if (params && params.q) {
        url += `&query=${encodeURIComponent(params.q)}`;
    }
    
    const response = await fetchApi<FetchResultType<UserImageResponse[]>>(url);

    return response.data;
};

export default getEditorImages;