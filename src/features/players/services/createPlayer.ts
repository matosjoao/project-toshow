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

const createPlayer = async (data: FormData) => {
    const response = await fetchApi<DataResponse>('players', { 
        method: 'POST',
        body: data
    });

    return response.data;
};

export default createPlayer;