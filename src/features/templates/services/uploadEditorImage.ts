import fetchApi from "../../../lib/fetch";
import { ImageUploadResponse } from "../types";

const uploadEditorImage = async (data: FormData) => {
    
    const response = await fetchApi<ImageUploadResponse>('images', { 
        method: 'POST',
        body: data
    });

    return response.data;
};

export default uploadEditorImage;