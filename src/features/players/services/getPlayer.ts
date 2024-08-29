import { FetchResultType } from "../../../hooks/useFetch";
import fetchApi from "../../../lib/fetch";
import { Player } from "../types";

const getPlayer = async (params?: string | undefined) => {
    if (!params) {
        throw new Error('Invalid id.');
    }
    
    const response = await fetchApi<FetchResultType<Player>>(`players/${params}`);

    return response.data;
};

export default getPlayer;