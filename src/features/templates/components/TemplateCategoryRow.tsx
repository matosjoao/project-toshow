import React, { useEffect, useRef, useState } from 'react';
import { TemplateType } from '../types';
import TemplateCategoryRowItem from './TemplateCategoryRowItem';

interface Props {
    types: TemplateType[];
    isFetching: boolean;
    onCreateClick: (width: number, height: number, templateTypeId: number) => void;
}

const TemplateCategoryRow: React.FC<Props> = ({types, isFetching, onCreateClick}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const rowRefs = useRef<HTMLSpanElement[]>([]);
    const widthInputRef = useRef<HTMLInputElement>(null);
    const heightInputRef = useRef<HTMLInputElement>(null);
    const [selectedRow, setSelectedRow] = useState<number | null>(null);

    // Calculate left and top position of 
    let left = 0;
    let top = 0;
    if (selectedRow !== null && rowRefs.current[selectedRow]) {
        const row = rowRefs.current[selectedRow];
        const container = containerRef.current;
        const rowRect = row.getBoundingClientRect();
        const containerRect = container?.getBoundingClientRect();
        if(containerRect) {
            top = rowRect.top - containerRect.top + 25;
            left = rowRect.left - containerRect.left + (rowRect.width / 2) - 20;
        }
    }

    useEffect(() => {
        if(types.length > 0) {
            setSelectedRow(0);
        }
    }, [types]);

    const onCategoryClickHandler = (index: number) => {
        setSelectedRow(index);
    };

    /* 
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
    */

    const onCreateClickHandler = () => {
        const width = widthInputRef.current?.value;
        const height = heightInputRef.current?.value;
        const templateType = selectedRow != null ? types[selectedRow] : null;
        if(!templateType || !templateType?.id || !width || !height) {
            return;
        }
      
        onCreateClick(parseInt(width), parseInt(height), templateType.id);
    };

    return (
        <>
            <div className="flex flex-col md:flex-row flex-1 my-6 m-auto">
                <div className="flex flex-1">
                    <div className="flex items-center mr-2 ">
                        <input ref={widthInputRef} type="number" className="h-8 w-24 p-2 text-center rounded-lg outline-none" min="100" max="5000" defaultValue={1080} placeholder="Largura"/> 
                        <span className="text-white font-semibold text-sm pl-2">px</span>
                    </div>
                    <div className="flex items-center">
                        <input ref={heightInputRef} type="number" className="h-8 w-24 p-2 text-center rounded-lg outline-none" min="100" max="5000" defaultValue={1080} placeholder="Altura"/>
                        <span className="text-white font-semibold text-sm pl-2">px</span>
                    </div>
                </div>
                <div className="flex flex-1 justify-center md:ml-12 mt-2 md:mt-0">
                    <button className="bg-white w-28 h-12 p-2 rounded-lg text-center text-lg font-bold text-purple-800 hover:scale-110" onClick={onCreateClickHandler}>Criar novo</button>
                </div>
            </div>
            <div className="flex flex-1 relative" ref={containerRef}>
                <div className="flex flex-1 w-full min-h-32 overflow-x-hidden py-4 justify-center">
                    { !isFetching && types.map((templateType, index) => (
                        <TemplateCategoryRowItem key={`category-${templateType.id}`} title={templateType.description} name={templateType.name} onClick={() => onCategoryClickHandler(index)} ref={el => el ? rowRefs.current[index] = el : undefined} />
                    ))}
                    { isFetching && (<div className='flex flex-1 items-center justify-center'>Loading...</div>)}
                </div>
                {selectedRow != null && <div className="absolute text-4xl text-white text-center" style={{ top: `${top}px`, left: `${left}px`, width: `40px`, transition: "top 0.3s ease, left 0.3s ease" }}>
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 19h18a1.002 1.002 0 00.823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 003 19z" /></svg>
                </div>}
            </div>
        </>
    );
};

export default TemplateCategoryRow;