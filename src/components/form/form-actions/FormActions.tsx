import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import FormButton from "../form-button/FormButton";
import { ButtonStyle } from "../form-button/types";

interface Props {
    isSaving?: boolean;
    hasSubmit?: boolean;
}

const FormActions: React.FC<Props> = ({isSaving = false, hasSubmit = true}) => {
    const navigate = useNavigate();

    const onCancelClickHandler = (e: MouseEvent) => {
        e.preventDefault();
        navigate('..');
    };

    return (
        <div className="flex flex-1 mt-10 justify-between pt-4 border-t-2 border-gray-100">
            <FormButton style={ButtonStyle.BACK} onClick={onCancelClickHandler} isDisabled={isSaving}>Voltar</FormButton>
            { hasSubmit && <FormButton buttonType="submit" isDisabled={isSaving}> {isSaving ? 'A Guardar...' : 'Guardar'} </FormButton>}
        </div>
    );
};
  
export default FormActions;