import fetchApi from "../../../lib/fetch";

type DataResponse = {
    message: string,
    game: {
        id: number,
    }, 
}

export type DataRequest = {
    startDate: string,
    address: string,
    round: string,
    homeTeam: string,
    homeTeamLevel: string,
    awayTeam: string,
    awayTeamLevel: string,
    level: string,
}

const createGame = async (data: DataRequest) => {
    const response = await fetchApi<DataResponse>('games', { 
        method: 'POST',
        body: JSON.stringify(data)
    });

    return response.data;
};

export default createGame;