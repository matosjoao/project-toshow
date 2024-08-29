import { FetchQueryType, FetchResultType } from "../../../hooks/useFetch";
import fetchApi from "../../../lib/fetch";
import { Player } from "../types";

const getPlayers = async (params?: FetchQueryType) => {
    const page = params ? params.page : 1;
    let url = `players?page=${page}`;
    if (params && params.q) {
        url += `&query=${encodeURIComponent(params.q)}`;
    }
    
    const response = await fetchApi<FetchResultType<Player[]>>(url);

    return response.data;
};

export default getPlayers;