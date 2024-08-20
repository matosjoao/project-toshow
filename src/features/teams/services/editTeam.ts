import fetchApi from "../../../lib/fetch";

type DataResponse = {
    message: string,
    team: {
        id: number,
    }, 
}

const editTeam = async (teamId: string, data: FormData) => {
    // Laravel don't handle well PUT request with FormData, use Method spoofing
    data.append('_method', 'PUT');

    const response = await fetchApi<DataResponse>(`teams/${teamId}`, { 
        method: 'POST',
        body: data
    });

    return response.data;
};

export default editTeam;