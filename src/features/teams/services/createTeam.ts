import fetchApi from "../../../lib/fetch";

type DataResponse = {
    message: string,
    team: {
        id: number,
    }, 
}

const createTeam = async (data: FormData) => {
    const response = await fetchApi<DataResponse>('teams', { 
        method: 'POST',
        body: data
    });

    return response.data;
};

export default createTeam;