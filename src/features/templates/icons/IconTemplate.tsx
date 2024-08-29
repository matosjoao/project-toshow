import { SVGProps } from "react";

const IconTemplate: React.FC<SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg 
            fill="none" 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            viewBox="0 0 24 24"
            preserveAspectRatio="xMidYMid meet"
            {...props}>
                <path d="M4 3 H20 A1 1 0 0 1 21 4 V9 A1 1 0 0 1 20 10 H4 A1 1 0 0 1 3 9 V4 A1 1 0 0 1 4 3 z" />
                <path d="M4 14 H11 A1 1 0 0 1 12 15 V20 A1 1 0 0 1 11 21 H4 A1 1 0 0 1 3 20 V15 A1 1 0 0 1 4 14 z" />
                <path d="M17 14 H20 A1 1 0 0 1 21 15 V20 A1 1 0 0 1 20 21 H17 A1 1 0 0 1 16 20 V15 A1 1 0 0 1 17 14 z" />
        </svg>
    );
};
  
export default IconTemplate;