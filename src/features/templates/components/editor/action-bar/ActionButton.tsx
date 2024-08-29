import { MouseEvent } from "react";

interface Props {
	children: string;
	onClick: (e: MouseEvent) => void;
	icon: React.ReactNode;
}

const ActionButton: React.FC<Props> = ({ children, onClick, icon}) => {
	return (
		<div onClick={onClick} className={`flex flex-col items-center mb-3 py-2 text-white hover:scale-[1.1] cursor-pointer`}>
            <div className="text-3xl">
				{icon}
			</div>
            <div className="text-md font-thin">{children}</div>
        </div>
	);
};

export default ActionButton;
