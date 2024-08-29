import { ChangeEvent, useRef, useState } from "react";
import { UserImageResponse } from "../../../types";
import uploadEditorImage from "../../../services/uploadEditorImage";

interface Props {
    onImageUploaded?: (image: UserImageResponse) => void,
}

const PanelUploadForm: React.FC<Props> = ({onImageUploaded}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);

    const onFileUploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setError(null);

        const file = e.target.files?.[0];
        if (!file) return;

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }

        uploadFileHandler(file);
    };

    const uploadFileHandler = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const result = await uploadEditorImage(formData);
            if(onImageUploaded && result.image) onImageUploaded(result.image);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message || 'Erro ao carregar imagem.');
            } else {
                setError('Erro ao carregar imagem.');
            }
        }

        /* 
        try {
            const reader = new FileReader();
            reader.onload = async (e) => {
                if (e.target && e.target.result) {
                    const fileContentBase64 = e.target.result as string;
                }
            };
            reader.readAsDataURL(file);
        } catch (error) {} 
        */
    };

    return (
        <div className="flex flex-col flex-none w-full h-20 p-4">
            <label htmlFor="file-upload" className="w-full h-14 cursor-pointer bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Carregar
                <input ref={fileInputRef} id="file-upload" name="file-upload" type="file" className="hidden" onChange={onFileUploadHandler} />
            </label>
            {error && <p className="text-xs text-red-500 text-center p-2">{error}</p>}
        </div>
    );
};

export default PanelUploadForm;
