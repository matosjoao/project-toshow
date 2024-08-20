import { useEffect, useRef, useState } from "react";
import useOnClickOutside from "../../../hooks/useOnClickOutside";

export interface BaseSelectOption {
    id: string;
    text: string;
}

export interface FormSelectOptionProps<T extends BaseSelectOption> {
    option: T;
    isSelected: boolean;
    onClick: (option: T) => void;
}

interface Props<T extends BaseSelectOption> {
    label: string;
    id: string;
    containerClassesNames?: string;
    labelClassesNames?: string;
    inputClassesNames?: string;
    placeholder?: string;
    defaultSelectedOptionId?: string;
    options: T[];
    CustomOptionComponent?: React.ComponentType<FormSelectOptionProps<T>>;
    required?: boolean;
}

const FormSelect = <T extends BaseSelectOption>({
    label,
    id,
    containerClassesNames = '',
    labelClassesNames = '',
    inputClassesNames = '',
    placeholder = '',
    defaultSelectedOptionId,
    options,
    CustomOptionComponent,
    required = false,
    }: Props<T>) => {
    //const [selectedOption, setSelectedOption] = useState<BaseSelectOption | null>(null);
    const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    
    //TODO:: On Scroll reach end load next page

    useOnClickOutside(containerRef, () => {
        setIsOpen(false);
    });

    useEffect(()=> {
        if(defaultSelectedOptionId) {
            setSelectedOptionId(defaultSelectedOptionId);
        }
    },[defaultSelectedOptionId]);

    const onSelectOptionHandler = (option: BaseSelectOption) => {
        setSelectedOptionId(option.id);
        setIsOpen(false);
    };

    const option = options.find(option => option.id === selectedOptionId);
    const selectedInputValueId = option?.id || '';
    const selectedInputValueText = option?.text || '';
    const selectedClass = 'bg-gray-500 text-white hover:bg-gray-500';

    return (
        <div ref={containerRef} className={`my-2 ${containerClassesNames}`}>
            <label className={`${labelClassesNames || "block text-gray-700 text-sm font-bold mb-2"}`} htmlFor={id}>
                {label}
            </label>
            <div className="relative">
                <input
                    type="hidden"
                    id={id}
                    name={id}
                    value={selectedInputValueId}
                    readOnly={true}
                />
                <input
                    type="text"
                    className={`${inputClassesNames || "shadow-sm appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer"}`}
                    value={selectedInputValueText}
                    readOnly={true}
                    onClick={() => setIsOpen(curState => !curState)}
                    required={required}
                    placeholder={placeholder}
                />
                {isOpen && (
                    <div className="absolute z-10 mt-2 w-full max-h-80 overflow-y-auto bg-white rounded-lg shadow-lg">
                        {options.map(option => 
                            CustomOptionComponent ? (
                                <CustomOptionComponent key={option.id} option={option} isSelected={option.id === selectedOptionId} onClick={() => onSelectOptionHandler(option)} />
                            ) : (
                                <div key={option.id} className={`flex items-center p-2 cursor-pointer ${option.id === selectedOptionId ? selectedClass : 'hover:bg-gray-100'}`} onClick={() => onSelectOptionHandler(option)}>
                                    {option.text}
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
  
export default FormSelect;