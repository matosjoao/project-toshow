import { ChangeEvent, useEffect, useState } from "react";

interface Props {
    label: string;
    id: string;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    defaultValue?: string;
    containerClassesNames?: string;
}

const FormInput: React.FC<Props> = ({label, id, inputProps, defaultValue = '', containerClassesNames = ''}) => {
    const [inputValue, setInputValue] = useState(defaultValue);

    const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    useEffect(()=> {
        if(defaultValue) {
            setInputValue(defaultValue);
        }
    },[defaultValue]);

    return (
        <div className={`my-2 ${containerClassesNames}`}>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
                {label}
            </label>
            <input
                type="text"
                className="shadow-sm appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...inputProps}
                id={id}
                name={id}
                value={inputValue}
                onChange={onInputChangeHandler}
            />
        </div>
    );
};
  
export default FormInput;