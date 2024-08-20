import { useState } from "react";

interface Props {
    label: string;
    id: string;
    required?: boolean;
    defaultValue?: string;
}

const FormFile: React.FC<Props> = ({label, id, required = false, defaultValue}) => {
    const [image, setImage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedImage = e.target.files?.[0];
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];

        if (selectedImage && allowedTypes.includes(selectedImage.type)) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(selectedImage);
            setError(null);
        } else {
            setImage(null);
            setError('Por favor seleccione uma imagem válida (png, jpeg, jpg).');
        }
    };

    return (
        <div className="my-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
                {label}
            </label>
            <div className="flex flex-col justify-center">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="shadow-sm appearance-none border rounded-lg w-full py-1 px-3 text-gray-700"
                    id={id}
                    name={id}
                    required={required}
                />
                {error && <p className="text-red-500 text-xs pt-2 pl-2">{error}</p>}
                {image && (
                    <div className="w-24 h-24 my-2 shadow-sm border rounded-lg">
                        <img src={image} alt="Uploaded image" className="w-full h-full object-contain" />
                    </div>
                )}
                {(defaultValue && !image) && (
                   <div className="w-24 h-24 my-2 shadow-sm border rounded-lg">
                        <img src={defaultValue} alt="Uploaded image" className="w-full h-full object-contain" />
                    </div>
                )}
            </div>
        </div>
    );
};
  
export default FormFile;