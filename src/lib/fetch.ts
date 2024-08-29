import { getAuthToken } from "../utils/auth";

interface FetchOptions {
    method?: string;
    headers?: Record<string, string>;
    body?: string | FormData; 
    responseType?: 'json' | 'blob';
}

interface FetchResponse<T> {
    data: T;
    status: number;
    ok: boolean;
}

const API_BASE_URL = 'http://127.0.0.1:8000/api/';

const fetchApi = async <T>(endpoint: string, options: FetchOptions = {}): Promise<FetchResponse<T>> => {
    
    const token = getAuthToken();
    
    const { method = 'GET', headers = {}, body, responseType = 'json' } = options;

    const finalHeaders = {
        'Authorization': `Bearer ${token}`,
        ...(body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
        ...headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers: finalHeaders,
        body,
    });

    let data;
    switch (responseType) {
        case 'blob':
            data = (await response.blob());
            break;
        case 'json':
        default:
            data = (await response.json());
            break;
    }

    if (!response.ok) {
        throw new Error(data.message || 'Ocurreu um erro, por favor tente mais tarde.');
    }

    return {
        data,
        status: response.status,
        ok: response.ok,
    };
};

export default fetchApi;