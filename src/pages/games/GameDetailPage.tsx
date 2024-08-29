import { useParams } from "react-router-dom";
import { useState } from "react";
import { FormActions, FormBadge, FormButton, FormLabel, FormSingleAccordion } from "../../components/form";
import PageContainer from "../../components/page-container/PageContainer";
import useFetch from "../../hooks/useFetch";
import { IconCalendarEventFill } from "../../features/templates/icons";
import { ButtonStyle } from "../../components/form/form-button/types";
import { getGame, getGameImage } from "../../features/games";
import { Game } from "../../features/games/types";

const GameDetailPage: React.FC = () => {
    const params = useParams();
    const gameId = params.gameId;
    const { data } = useFetch<Game, string>(getGame, undefined, true, gameId) ;

	const [imageSrc, setImageSrc] = useState<string>();

    const onImageDownloadHandler = async () => {
		if(!gameId) {
			return;
		}

		try {
			const result = await getGameImage({game: gameId, templateType: "1"});
			const imageUrl = window.URL.createObjectURL(result);
			setImageSrc(imageUrl);
			setTimeout(() => {
                window.URL.revokeObjectURL(imageUrl);
            }, 60000); 

			/* const url = window.URL.createObjectURL(result);
			const a = document.createElement('a');
			a.href = url;
			a.download = `game-day-${gameId}.jpeg`;
			document.body.appendChild(a);
			a.click();

			a.remove();
			window.URL.revokeObjectURL(url); */
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<PageContainer title="Detalhe jogo">
			<div className="my-4">
				<h1 className="font-bold text-xl pb-2 border-b-2 border-black">Detalhes:</h1>
			</div>
			<div className="flex flex-1">
				<FormLabel label="Equipa Visitada">
					<div className="flex flex-col justify-center items-center">
						{data?.homeTeamLogo ? (
							<img src={data?.homeTeamLogo} alt={`Logo ${data?.homeTeamName}`} className="w-8 h-8 rounded-full object-contain"/> 
						) : (
							<FormBadge classes="w-8 h-8 mr-2" letter={data?.homeTeamName.substring(0, 1) || ''} />
						)}
						{data && <span>{data.homeTeamName.substring(0, 15)} - {data.homeTeamLevel}</span>}
					</div>
				</FormLabel>
				<FormLabel label="Equipa Visitante" containerClassesNames="ml-20">
					<div className="flex flex-col justify-center items-center">
						{data?.awayTeamLogo ? (
							<img src={data?.awayTeamLogo} alt={`Logo ${data?.awayTeamName}`} className="w-8 h-8 rounded-full object-contain"/> 
						) : (
							<FormBadge classes="w-8 h-8 mr-2" letter={data?.awayTeamName.substring(0, 1) || ''} />
						)}
						{data && <span>{data.awayTeamName.substring(0, 15)} - {data.awayTeamLevel}</span>}
					</div>
				</FormLabel>
			</div>
			<FormLabel label="Local"><span>{data?.address}</span></FormLabel>
			<FormLabel label="Ronda"><span>{data?.round}</span></FormLabel>
			
			<div className="my-4">
				<h1 className="font-bold text-xl pb-2 border-b-2 border-black">Imagens:</h1>
			</div>
			<FormSingleAccordion title="Dia de Jogo" icon={<IconCalendarEventFill/>} initialOpen={true}>
				{imageSrc && <img src={imageSrc} className="w-full h-full object-contain" />}
				{
					!imageSrc && (
						<div className="border-[1px] w-full h-full rounded-lg flex items-center justify-center">
							<div>
								<FormButton style={ButtonStyle.SUCCESS} onClick={onImageDownloadHandler}>Gerar</FormButton>
							</div>
						</div>
					)
				}
			</FormSingleAccordion>

			<FormActions hasSubmit={false} />
		</PageContainer>
	);
};

export default GameDetailPage;