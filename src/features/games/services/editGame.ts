import fetchApi from "../../../lib/fetch";

export type DataRequest = {
    startDate: string,
    address: string,
    round: string,
    homeTeam: string,
    homeTeamLevel: string,
    awayTeam: string,
    awayTeamLevel: string,
    level: string,
    _method?: string
}

type DataResponse = {
    message: string,
    game: {
        id: number,
    }, 
}

const editGame = async (gameId: string, data: DataRequest) => {
    // Laravel don't handle well PUT request with FormData, use Method spoofing
    data._method = 'PUT';

    const response = await fetchApi<DataResponse>(`games/${gameId}`, { 
        method: 'POST',
        body: JSON.stringify(data)
    });

    return response.data;
};

export default editGame;