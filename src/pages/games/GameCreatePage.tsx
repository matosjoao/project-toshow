import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../utils/toast";
import PageContainer from "../../components/page-container/PageContainer";
import { FormActions, FormBadge, FormContainer, FormInput, FormSelect } from "../../components/form";
import useFetch from "../../hooks/useFetch";
import { BaseSelectOption, FormSelectOptionProps } from "../../components/form/form-select/FormSelect";
import { createGame } from "../../features/games";
import { GameCreateRequest } from "../../features/games/types";
import { Team } from "../../features/teams/types";
import { getTeams } from "../../features/teams";
import { getLevels, Level } from "../../services/levels";

type TeamSelectOptionProps = BaseSelectOption & Team;

const TeamSelectOption: React.FC<FormSelectOptionProps<TeamSelectOptionProps>> = ({option, isSelected, onClick}) => {
    return (
        <>
            <div className={`flex items-center p-2 cursor-pointer ${isSelected ? 'bg-gray-500 text-white hover:bg-gray-500' : 'hover:bg-gray-100'}`} onClick={() => onClick(option)}>
                {option.logo ? (
                    <div className="w-8 h-8 mr-2">
                        <img src={option.logo} alt={`Logo ${option.name}`} className="w-full h-full object-contain" />
                    </div>
                ) : (
                    <FormBadge classes="w-8 h-8 mr-2" letter={option.name.substring(0, 1)} />
                )}
                <span>{option.name}</span>
            </div>
        </>
    );
};

const GameCreatePage: React.FC = () => {
    const navigate = useNavigate();
    const [isSaving, setIsSaving] = useState(false);
    const { data:teamsData } = useFetch<Team[]>(getTeams, []) ;
    const teams = teamsData ? teamsData.map((team) => ({...team, text: team.name })) : [];
    const { data:levelsData } = useFetch<Level[]>(getLevels, []) ;
    const levels = levelsData ? levelsData.map((level) => ({...level, text: level.name })) : [];

    const onSubmitFormHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const fd = new FormData(form);
        const data = Object.fromEntries(fd.entries());
      
        const request: GameCreateRequest = {
            startDate: `${data.date as string} ${data.time as string}`,
            address: data.address as string,
            round: data.round as string,
            homeTeam: data.homeTeam as string,
            homeTeamLevel: data.homeTeamLevel as string,
            awayTeam: data.awayTeam as string,
            awayTeamLevel: data.awayTeamLevel as string,
            level: data.level as string
        };

        try {
            setIsSaving(true);
            
            const result = await createGame(request);
            
            toastSuccess(result.message, () => {
                navigate('..');
            });
        } catch (error) {
            setIsSaving(false);
            if (error instanceof Error) {
                toastError(error.message);
            } else {
                toastError("Ocurreu um erro ao gravar o jogo, por favor tente mais tarde ou contacte o administrador.");
            }
        }
    };

	return (
		<PageContainer title="Novo jogo">
			<FormContainer onSubmitForm={onSubmitFormHandler}>
                <div className="flex">
                    <FormSelect 
                        label="Equipa Visitada" 
                        id="homeTeam"
                        options={teams}
                        required={true}
                        containerClassesNames="flex-1 mr-2"
                        placeholder="Equipa Visitada"
                        CustomOptionComponent={TeamSelectOption}
                    />

                    <FormSelect 
                        label="Equipa Visitada Escalão" 
                        id="homeTeamLevel"
                        options={levels}
                        required={true}
                        placeholder="Equipa Visitada Escalão"
                        containerClassesNames="flex-1"
                    />
                </div>
                <div className="flex">
                    <FormSelect 
                        label="Equipa Visitante" 
                        id="awayTeam"
                        options={teams}
                        required={true}
                        containerClassesNames="flex-1 mr-2"
                        placeholder="Equipa Visitante"
                        CustomOptionComponent={TeamSelectOption}
                    />

                    <FormSelect 
                        label="Equipa Visitante Escalão" 
                        id="awayTeamLevel"
                        options={levels}
                        required={true}
                        placeholder="Equipa Visitante Escalão"
                        containerClassesNames="flex-1"
                    />
                </div>
                <div className="flex flex-1">
                    <FormInput 
                        label="Data" 
                        id="date" 
                        inputProps={{
                            placeholder: "Data do jogo",
                            required: true,
                            type: "date",
                            autoComplete: "off"
                        }}  
                    />
                    <FormInput 
                        label="&nbsp;" 
                        id="time" 
                        containerClassesNames="ml-2"
                        inputProps={{
                            placeholder: "Hora do jogo",
                            required: true,
                            type: "time",
                            autoComplete: "off"
                        }}  
                    />
                </div>
                <FormSelect 
                    label="Escalão do jogo" 
                    id="level"
                    options={levels}
                    required={true}
                    containerClassesNames="flex-1"
                    placeholder="Escalão do jogo"
                />
                <FormInput 
                    label="Local" 
                    id="address" 
                    inputProps={{
                        placeholder: "Local do jogo",
                        autoComplete: "off"
                    }}  
                />
                <FormInput 
                    label="Jornada" 
                    id="round" 
                    inputProps={{
                        placeholder: "Jornada do jogo",
                        autoComplete: "off"
                    }} 
                />
                <FormActions isSaving={isSaving} />
            </FormContainer>
		</PageContainer>
	);
};

export default GameCreatePage;