import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../components/page-container/PageContainer";
import SearchInput from "../../components/search-input/SearchInput";
import useFetch from "../../hooks/useFetch";
import { FormButton } from "../../components/form";
import { ButtonStyle } from "../../components/form/form-button/types";
import { GameTableRow, getGames } from "../../features/games";
import { Game } from "../../features/games/types";
import { Table, TablePagination } from "../../components/table";

const GamesPage: React.FC = () => {
	const { data, isFetching, pagination, fetchNextPage } = useFetch<Game[]>(getGames, []) ;
	const searchInputRef = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();

	const mappedRows = data?.map((game, index) => <GameTableRow key={game.id} game={game} index={index} isLastRow={index !== data.length-1} />);

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
		<PageContainer title="Jogos">
			<div className="flex flex-col sm:flex-row justify-between items-center mb-2">
				<div className="flex flex-1" />
				<div className="flex flex-1 justify-center my-4 mx-2">
					<SearchInput ref={searchInputRef} onSearch={onSearchHandler}/>
				</div>
				<div className="flex flex-1 justify-end">
					<FormButton style={ButtonStyle.SUCCESS} onClick={() => navigate('create')}>Adicionar</FormButton>
				</div>
			</div>
			<Table headerTitles={["Equipas", "Data", "Escalão", "Jornada", ""]} rows={mappedRows} isFetching={isFetching} />
			<TablePagination page={pagination.page} pages={pagination.pages} onPrevious={onPreviousClickHandler} onNext={onNextClickHandler} />
		</PageContainer>
	);
};

export default GamesPage;