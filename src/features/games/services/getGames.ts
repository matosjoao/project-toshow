import { FetchQueryType, FetchResultType } from "../../../hooks/useFetch";
import fetchApi from "../../../lib/fetch";
import { Game } from "../types";

const getGames = async (params?: FetchQueryType) => {
    const page = params ? params.page : 1;
    let url = `games?page=${page}`;
    if (params && params.q) {
        url += `&query=${encodeURIComponent(params.q)}`;
    }
    
    const response = await fetchApi<FetchResultType<Game[]>>(url);

    return response.data;
};

export default getGames;