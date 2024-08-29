import fetchApi from "../../../lib/fetch";

type DataResponse = {
    message: string,
    player: {
        id: number,
    }, 
}

export type DataRequest = {
    fullName: string,
    name: string,
    number: number,
    photo: string,
    birthday: string,
    position: string,
    level: string,
}

const editPlayer = async (playerId: string, data: FormData) => {
    // Laravel don't handle well PUT request with FormData, use Method spoofing
    data.append('_method', 'PUT');

    const response = await fetchApi<DataResponse>(`players/${playerId}`, { 
        method: 'POST',
        body: data
    });

    return response.data;
};

export default editPlayer;