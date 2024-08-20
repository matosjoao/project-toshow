import React, { useEffect, useRef, useState } from 'react';
import TemplateGalleryRowItem from './TemplateGalleryRowItem';
import { Template } from '../types';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface Props {
    title: string;
    templates: Template[];
    onEditTemplate: (templateId: number) => void;
    onDeleteTemplate: (templateId: number) => void;
}

const TemplateGalleryRow: React.FC<Props> = ({title, templates, onEditTemplate, onDeleteTemplate}) => {
    const row = useRef<HTMLDivElement>(null);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);

    const checkScrollPosition = () => {
        if (row.current) {
            const { scrollLeft, scrollWidth, clientWidth } = row.current;
            setIsAtStart(scrollLeft === 0);
            setIsAtEnd(scrollLeft + clientWidth >= scrollWidth);
        }
    };

    const onRightScrollClickHandler = () => {
        if (row.current) {
            row.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    const onLeftScrollClickHandler = () => {
        if (row.current) {
            row.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        checkScrollPosition();
        const handleScroll = () => checkScrollPosition();
        const rowCurrent = row.current;
        if (rowCurrent) {
            rowCurrent.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (rowCurrent) {
                rowCurrent.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    return (
        <div className="flex flex-col h-auto m-4 p-2">
            <div className="flex flex-1 items-end justify-between mb-2 px-2">
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                { templates.length > 10 && <button className="text-gray-900 text-sm font-semibold hover:underline hover:underline-offset-2">Ver mais</button>}
            </div>
            <div className="flex flex-1 relative">
                { templates.length == 0 && <p className='text-sm ml-6 text-gray-800'>Não existem templates para esta categoria ainda.</p>}
                <div ref={row} className="flex flex-1 w-full overflow-x-hidden py-4">
                    { templates.map(template => (
                        <TemplateGalleryRowItem 
                            key={`template_${template.id}`} 
                            image={template.image} 
                            description={template.description} 
                            onEditClick={() => onEditTemplate(template.id)}
                            onDeleteClick={() => onDeleteTemplate(template.id)} />
                    ))}
                </div>
                {
                    !isAtStart && 
                    (<button onClick={onLeftScrollClickHandler} className="absolute left-[-1em] top-1/2 transform -translate-y-1/2 shadow-2xl rounded-full border-[1px] text-gray-900 bg-white hover:bg-gray-900 hover:text-white hover:border-0">  
                        <FaAngleLeft/>
                    </button>)
                }
                {
                    !isAtEnd && 
                    (<button onClick={onRightScrollClickHandler} className="absolute right-[-1em] top-1/2 transform -translate-y-1/2 shadow-2xl rounded-full border-[1px] text-gray-900 bg-white hover:bg-gray-900 hover:text-white hover:border-0"> 
                        <FaAngleRight />
                    </button>)
                }
            </div>
        </div>
    );
};

export default TemplateGalleryRow;