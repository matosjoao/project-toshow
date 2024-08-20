import React, { useState } from 'react';

interface Props {
    image: string;
    description: string;
    onEditClick: () => void;
    onDeleteClick: () => void;
}

const TemplateGalleryRowItem: React.FC<Props> = ({image, description, onEditClick, onDeleteClick}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="relative flex flex-col flex-none h-auto overflow-hidden rounded-lg shadow-md mx-4 min-w-60 max-w-60"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            {isHovered && (
                <div className="absolute inset-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="flex flex-col items-center">
                        <button className="bg-white text-black w-20 py-2 rounded-lg mt-2" onClick={onEditClick}>Editar</button>
                        <button className="bg-white text-black w-20 py-2 rounded-lg mt-2" onClick={onDeleteClick}>Eliminar</button>
                    </div>
                </div>
            )}
            <img src={image} alt={`Image template ${description}`} className="h-40 w-full object-contain" />
            <div className="p-4 overflow-x-hidden">
                <p className="text-lg font-bold">{description}</p>
            </div>
        </div>
    );
};

export default TemplateGalleryRowItem;
