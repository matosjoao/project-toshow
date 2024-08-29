import fetchApi from "../../../lib/fetch";

type DataRequest = {
    game: string,
    templateType: string
}

const getGameImage = async (data: DataRequest) => {
    const response = await fetchApi<Blob>('game-image', { 
        method: 'POST',
        body: JSON.stringify(data),
        responseType: 'blob'
    });

    return response.data;
};

export default getGameImage; 