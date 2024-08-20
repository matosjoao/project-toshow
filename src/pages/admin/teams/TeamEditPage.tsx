

import PageContainer from "../../../components/page-container/PageContainer";
import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useState } from "react";
import { toastError, toastSuccess } from "../../../utils/toast";
import { FormFile, FormInput, FormActions, FormContainer} from "../../../components/form";
import useFetch from "../../../hooks/useFetch";
import { editTeam, getTeam } from "../../../features/teams";
import { Team } from "../../../features/teams/types";

const TeamEditPage: React.FC = () => {
    const navigate = useNavigate();
    const params = useParams();
    const teamId = params.teamId;
    const { data } = useFetch<Team, string>(getTeam, undefined, true, teamId) ;
    const [isSaving, setIsSaving] = useState(false);

    const onSubmitFormHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const teamId = data?.id;
        if(!teamId) { return; }
        const form = e.target as HTMLFormElement;
        const fd = new FormData(form);
        
        try {
            setIsSaving(true);
            
            const result = await editTeam(teamId, fd);
            
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
		<PageContainer title="Editar Equipa">
			<FormContainer onSubmitForm={onSubmitFormHandler} formProps={{encType: "multipart/form-data"}}>
                <FormInput 
                    label="Nome" 
                    id="name" 
                    defaultValue={data?.name}
                    inputProps={{
                        placeholder: "Nome da equipa",
                        required: true
                    }}  
                />
                <FormInput 
                    label="Abreviatura" 
                    id="abbreviation" 
                    defaultValue={data?.abbreviation}
                    inputProps={{
                        placeholder: "Abreviatura da equipa",
                        required: true
                    }} 
                />
                <FormFile  
                    label="Logo" 
                    id="logo"
                    defaultValue={data && data.logo ? data.logo : ''} />
                <FormActions isSaving={isSaving} />
            </FormContainer>
		</PageContainer>
	);
};

export default TeamEditPage;