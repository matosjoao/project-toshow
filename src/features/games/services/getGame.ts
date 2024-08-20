import { FetchResultType } from "../../../hooks/useFetch";
import fetchApi from "../../../lib/fetch";
import { Game } from "../types";

const getGame = async (params?: string | undefined) => {
    if (!params) {
        throw new Error('Invalid id.');
    }
    
    const response = await fetchApi<FetchResultType<Game>>(`games/${params}`);

    return response.data;
};

export default getGame;