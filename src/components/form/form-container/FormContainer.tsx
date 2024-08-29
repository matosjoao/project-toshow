import { FormEvent, FormHTMLAttributes, ReactNode } from "react";

interface Props {
    onSubmitForm?: (e: FormEvent<HTMLFormElement>) => void;
    children: ReactNode;
    formProps?: FormHTMLAttributes<HTMLFormElement>;
}

const FormContainer: React.FC<Props> = ({onSubmitForm, children, formProps}) => {
    return (
        <form onSubmit={onSubmitForm} {...formProps}>
            {children}
        </form>
    );
};
  
export default FormContainer;