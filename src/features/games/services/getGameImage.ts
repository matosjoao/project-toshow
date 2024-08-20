import { getAuthToken } from "../../../utils/auth";

const API_BASE_URL = 'http://127.0.0.1:8000/api/';

const getGameImage = async (gameId: string, templateTypeId: string) => {
    const token = getAuthToken();
    
    const response = await fetch(`${API_BASE_URL}game-image`, { 
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            game: gameId,
            templateType: templateTypeId
        })
    });

    if (!response.ok) {
        throw new Error('Erro ao obter imagem');
    }

    const result = await response.blob();

    return result;
};

export default getGameImage;