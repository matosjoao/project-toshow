import { SVGProps } from "react";

const IconWhistle: React.FC<SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            preserveAspectRatio="xMidYMid meet"
            {...props}
        >
            <path d="M8.5 9A6.5 6.5 0 002 15.5 6.5 6.5 0 008.5 22a6.5 6.5 0 006.5-6.5v-1.59L22 12V9H11v2H9V9h-.5M11 2v5H9V2h2M6.35 7.28c-.67.16-1.31.4-1.92.72L2.14 4.88 3.76 3.7l2.59 3.58m11.51-2.4L16.32 7h-2.47l2.39-3.3 1.62 1.18z" />
        </svg>
    );
};
  
export default IconWhistle;