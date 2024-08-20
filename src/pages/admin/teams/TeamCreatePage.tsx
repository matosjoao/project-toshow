import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { toastError, toastSuccess } from "../../../utils/toast";
import { FormFile, FormInput, FormActions, FormContainer} from "../../../components/form";
import PageContainer from "../../../components/page-container/PageContainer";
import { createTeam } from "../../../features/teams";

const TeamCreatePage: React.FC = () => {
    const navigate = useNavigate();
    const [isSaving, setIsSaving] = useState(false);

    const onSubmitFormHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const fd = new FormData(form);
        
        try {
            setIsSaving(true);
            
            const result = await createTeam(fd);
            
            toastSuccess(result.message, () => {
                navigate('..');
            });
        } catch (error) {
            setIsSaving(false);
            if (error instanceof Error) {
                toastError(error.message);
            } else {
                toastError("Ocurreu um erro ao gravar a equipa, por favor tente mais tarde ou contacte o administrador.");
            }
        }
    };

	return (
		<PageContainer title="Nova Equipa">
			<FormContainer onSubmitForm={onSubmitFormHandler} formProps={{encType: "multipart/form-data"}}> 
                <FormInput 
                    label="Nome" 
                    id="name" 
                    inputProps={{
                        placeholder: "Nome da equipa",
                        required: true
                    }}  
                />
                <FormInput 
                    label="Abreviatura" 
                    id="abbreviation" 
                    inputProps={{
                        placeholder: "Abreviatura da equipa",
                        required: true
                    }} 
                />
                <FormFile  
                    label="Logo" 
                    id="logo"
                    required={false} />
                <FormActions isSaving={isSaving} />
            </FormContainer>
		</PageContainer>
	);
};

export default TeamCreatePage;