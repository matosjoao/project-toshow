import fetchApi from "../../../lib/fetch";

type DataResponse = {
    message: string,
    token: string,
}

export type DataRequest = {
    email: string,
    password: string,
    year: string,
    device?: string,
}

const login = async (data: DataRequest) => {
    data.device = 'web-token';

    const response = await fetchApi<DataResponse>('login', { 
        method: 'POST',
        body: JSON.stringify(data)
    });

    return response.data;
};

export default login;