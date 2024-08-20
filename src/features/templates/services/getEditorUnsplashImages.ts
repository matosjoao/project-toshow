import { FetchQueryType, FetchResultType } from "../../../hooks/useFetch";
import fetchApi from "../../../lib/fetch";
import { ImageResponse } from "../types";

const getEditorUnsplashImages = async (params?: FetchQueryType) => {
    const page = params ? params.page : 1;
    let url = `unsplash-images?page=${page}`;
    if (params && params.q) {
        url += `&query=${encodeURIComponent(params.q)}`;
    }
    
    const response = await fetchApi<FetchResultType<ImageResponse[]>>(url);

    return response.data;
};

export default getEditorUnsplashImages;