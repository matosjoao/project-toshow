import { useState } from "react";

interface Props {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
    initialOpen?: boolean;
}

const FormSingleAccordion: React.FC<Props> = ({icon, title, children, initialOpen = false}) => {
    const [isOpen, setIsOpen] = useState(initialOpen);

    return (
        <div className="flex flex-col mx-4 bg-gray-100 p-4 my-2 rounded-lg">
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-between">
                <div className="flex items-center">
                    <span className="w-6 h-6 mr-2 text-orange-600">{icon}</span>
                    <span className="text-gray-600 text-sm font-semibold">{title}</span>
                </div>
                <div>
                    <svg
                        className={`w-6 h-6 ${isOpen ? 'transform rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </div>
            </button>
            {isOpen && (
                <div className={`overflow-hidden transition-[max-height] duration-1000 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                    <div className="w-48 h-48 mt-4">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};
  
export default FormSingleAccordion;