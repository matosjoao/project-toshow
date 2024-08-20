import { FetchQueryType, FetchResultType } from "../../../hooks/useFetch";
import fetchApi from "../../../lib/fetch";
import { FontResponse } from "../types";

const getEditorFonts = async (params?: FetchQueryType) => {
    const page = params ? params.page : 1;
    let url = `fonts?page=${page}`;
    if (params && params.q) {
        url += `&query=${encodeURIComponent(params.q)}`;
    }
    
    const response = await fetchApi<FetchResultType<FontResponse[]>>(url);

    return response.data;
};

export default getEditorFonts;