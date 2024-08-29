import { FetchQueryType, FetchResultType } from "../../hooks/useFetch";
import fetchApi from "../../lib/fetch";

export type Level = {
    id: string,
    name: string
}

const getLevels = async (params?: FetchQueryType) => {
    const page = params ? params.page : 1;
    let url = `levels?page=${page}`;
    if (params && params.q) {
        url += `&query=${encodeURIComponent(params.q)}`;
    }
    
    const response = await fetchApi<FetchResultType<Level[]>>(url);

    return response.data;
};

export default getLevels;