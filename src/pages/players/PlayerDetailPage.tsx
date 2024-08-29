import { useParams } from "react-router-dom";
import { FormActions, FormBadge, FormLabel } from "../../components/form";
import PageContainer from "../../components/page-container/PageContainer";
import useFetch from "../../hooks/useFetch";
import { Player } from "../../features/players/types";
import { getPlayer } from "../../features/players";
import { formatDateTime } from "../../utils/dates";

const GameDetailPage: React.FC = () => {
    const params = useParams();
    const playerId = params.playerId;
    const { data } = useFetch<Player, string>(getPlayer, undefined, true, playerId) ;
    const birthDay = data ? formatDateTime(new Date(data.birthday), 'DD/MM/YYYY') : '';

	return (
		<PageContainer title="Detalhe jogador">
			<div className="my-4">
				<h1 className="font-bold text-xl pb-2 border-b-2 border-black">Detalhes:</h1>
			</div>
            <FormLabel label="">
                <div className="flex">
                    {data?.photo ? (
                        <img src={data?.photo} alt={`Foto ${data?.name}`} className="w-16 h-16 rounded-full object-contain"/> 
                    ) : (
                        <FormBadge classes="w-16 h-16 mr-2" letter={data?.name.substring(0, 1) || ''} />
                    )}
                </div>
            </FormLabel>
			<FormLabel label="Nome completo">{data?.fullName}</FormLabel>
			<FormLabel label="Nome">{data?.name}</FormLabel>
			<FormLabel label="Data de nascimento">{birthDay}</FormLabel>
            <div className="flex flex-1 justify-between">
                <FormLabel label="Número">{data?.number}</FormLabel>
                <FormLabel label="Posição">{data?.position}</FormLabel>
                <FormLabel label="Escalão">{data?.level}</FormLabel>
            </div>
            {/*  Criar componente para carregar fotos */}
			<FormActions hasSubmit={false} />
		</PageContainer>
	);
};

export default GameDetailPage;