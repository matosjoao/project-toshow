import { FetchResultType } from "../../../hooks/useFetch";
import fetchApi from "../../../lib/fetch";
import { Team } from "../types";

const getTeam = async (params?: string | undefined) => {
    if (!params) {
        throw new Error('Invalid id.');
    }
    
    const response = await fetchApi<FetchResultType<Team>>(`teams/${params}`);

    return response.data;
};

export default getTeam;