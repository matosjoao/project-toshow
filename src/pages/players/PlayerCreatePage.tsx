import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../utils/toast";
import PageContainer from "../../components/page-container/PageContainer";
import { FormActions, FormContainer } from "../../components/form";
import useFetch from "../../hooks/useFetch";
import { createPlayer, getPlayerPositions, PlayerForm } from "../../features/players";
import { getLevels, Level } from "../../services/levels";
import { PlayerPosition } from "../../features/players/types";

const PlayerCreatePage: React.FC = () => {
    const navigate = useNavigate();
    const [isSaving, setIsSaving] = useState(false);
    const { data:levelsData } = useFetch<Level[]>(getLevels, []) ;
    const levels = levelsData ? levelsData.map((level) => ({...level, text: level.name })) : [];
    const { data:positionsData } = useFetch<PlayerPosition[]>(getPlayerPositions, []) ;
    const positions = positionsData ? positionsData.map((position) => ({...position, text: position.name })) : [];

    const onSubmitFormHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const fd = new FormData(form);

        try {
            setIsSaving(true);
            
            const result = await createPlayer(fd);
            
            toastSuccess(result.message, () => {
                navigate('..');
            });
        } catch (error) {
            setIsSaving(false);
            if (error instanceof Error) {
                toastError(error.message);
            } else {
                toastError("Ocurreu um erro ao gravar o jogador, por favor tente mais tarde ou contacte o administrador.");
            }
        }
    };

	return (
		<PageContainer title="Novo jogador">
			<FormContainer onSubmitForm={onSubmitFormHandler} formProps={{encType: "multipart/form-data"}}> 
                <PlayerForm levels={levels} positions={positions} />
                <FormActions isSaving={isSaving} />
            </FormContainer>
		</PageContainer>
	);
};

export default PlayerCreatePage;