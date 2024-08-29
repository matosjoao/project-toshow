import { FetchQueryType, FetchResultType } from "../../../hooks/useFetch";
import fetchApi from "../../../lib/fetch";
import { PlayerPosition } from "../types";

const getPlayerPositions = async (params?: FetchQueryType) => {
    const page = params ? params.page : 1;
    let url = `player-positions?page=${page}`;
    if (params && params.q) {
        url += `&query=${encodeURIComponent(params.q)}`;
    }
    
    const response = await fetchApi<FetchResultType<PlayerPosition[]>>(url);

    return response.data;
};

export default getPlayerPositions;