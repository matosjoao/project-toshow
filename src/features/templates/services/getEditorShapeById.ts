import fetchApi from "../../../lib/fetch";
import { ShapeFileResponse } from "../types";

const getEditorShapeById = async (id: string) => {
    const response = await fetchApi<ShapeFileResponse>(`shapes/${id}`);
    return response.data;
};

export default getEditorShapeById;