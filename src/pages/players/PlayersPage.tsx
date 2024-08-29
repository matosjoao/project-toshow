import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Player } from "../../features/players/types";
import { getPlayers, PlayerTableRow } from "../../features/players";
import { useFetch } from "../../hooks";
import PageContainer from "../../components/page-container/PageContainer";
import SearchInput from "../../components/search-input/SearchInput";
import { FormButton } from "../../components/form";
import { ButtonStyle } from "../../components/form/form-button/types";
import { Table, TablePagination } from "../../components/table";

const PlayersPage: React.FC = () => {
	const { data, isFetching, pagination, fetchNextPage } = useFetch<Player[]>(getPlayers, []) ;
	const searchInputRef = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();

	const mappedRows = data?.map((player, index) => <PlayerTableRow key={player.id} player={player} index={index} isLastRow={index !== data.length-1} />);

	const onSearchHandler = (term: string) => {
		fetchNextPage(true, {page: 1, q: term});
	};

	const onPreviousClickHandler = () => {
		if(pagination.page <=1 ) {
			return;
		}
		fetchNextPage(true, {page: pagination.page - 1, q: searchInputRef.current?.value || ''});
	};

	const onNextClickHandler = () => {
		if(pagination.page >= pagination.pages ) {
			return;
		}
		fetchNextPage(true, {page: pagination.page + 1, q: searchInputRef.current?.value || ''});
	};

	return (
		<PageContainer title="Jogadores">
			<div className="flex flex-col sm:flex-row justify-between items-center mb-4">
				<div className="flex flex-1" />
				<div className="flex flex-1 justify-center my-4 mx-2">
					<SearchInput ref={searchInputRef} onSearch={onSearchHandler}/>
				</div>
				<div className="flex flex-1 justify-end">
					<FormButton style={ButtonStyle.SUCCESS} onClick={() => navigate('create')}>Adicionar</FormButton>
				</div>
			</div>
			<Table headerTitles={["Foto", "Nome", "Número", "Posição", "Escalão", ""]} rows={mappedRows} isFetching={isFetching} />
			<TablePagination page={pagination.page} pages={pagination.pages} onPrevious={onPreviousClickHandler} onNext={onNextClickHandler} />
		</PageContainer>
	);
};

export default PlayersPage;