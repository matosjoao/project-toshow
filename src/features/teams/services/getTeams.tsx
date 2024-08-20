import { FetchQueryType, FetchResultType } from "../../../hooks/useFetch";
import fetchApi from "../../../lib/fetch";
import { Team } from "../types";

const getTeams = async (params?: FetchQueryType) => {
    const page = params ? params.page : 1;
    let url = `teams?page=${page}`;
    if (params && params.q) {
        url += `&query=${encodeURIComponent(params.q)}`;
    }
    
    const response = await fetchApi<FetchResultType<Team[]>>(url);

    return response.data;
};

export default getTeams;