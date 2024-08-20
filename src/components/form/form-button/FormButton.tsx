import { ButtonHTMLAttributes, MouseEvent } from "react";
import { ButtonStyle } from "./types";

interface Props {
    children: React.ReactNode;
    onClick?: (e: MouseEvent) => void;
    buttonType?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
    style?: ButtonStyle;
    isDisabled?: boolean;
}

const FormButton: React.FC<Props> = ({children, onClick, buttonType = 'button', style = ButtonStyle.PRIMARY, isDisabled = false}) => {
    let buttonColors = 'bg-blue-700 hover:bg-blue-800 text-white';
    if(style === ButtonStyle.SUCCESS) {
        buttonColors = 'bg-green-600 hover:bg-green-700 text-white';
    } else if(style === ButtonStyle.BACK) {
        buttonColors = 'bg-gray-300 hover:bg-gray-400 text-black';
    }

    const onClickHandler = buttonType !== 'submit' ? onClick : undefined;

    return (
        <button type={buttonType} className={`${buttonColors} font-semibold py-2 px-6 rounded-lg`} onClick={onClickHandler} disabled={isDisabled}>
            {children}
        </button>
    );
};
  
export default FormButton;