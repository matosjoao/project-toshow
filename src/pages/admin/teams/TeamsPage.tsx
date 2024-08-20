import { useRef } from "react";
import SearchInput from "../../../components/search-input/SearchInput";
import useFetch from "../../../hooks/useFetch";
import PageContainer from "../../../components/page-container/PageContainer";
import { NavLink, useNavigate } from "react-router-dom";
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";
import { FormButton } from "../../../components/form";
import { ButtonStyle } from "../../../components/form/form-button/types";
import { Team } from "../../../features/teams/types";
import { getTeams } from "../../../features/teams";
import { Table, TablePagination } from "../../../components/table";

const TeamsPage: React.FC = () => {
	const { data, isFetching, pagination, fetchNextPage } = useFetch<Team[]>(getTeams, []) ;
	const searchInputRef = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();

	const mappedRows = data?.map((team, index) => {
		return (
			<tr key={team.id} className={`${index % 2 !== 0 ? 'bg-slate-50' : ''} ${index !== data.length-1 ? 'border-b-[1px] border-gray-300' : ''} h-10`}>
				<td className="py-2 px-4 text-sm">{team.logo ? <img className="w-10 h-10 object-contain" src={team.logo} alt={`Logo-${team.name}`} /> : '-'}</td>
				<td className="py-2 px-4 text-sm">{team.name}</td>
				<td className="py-2 px-4 text-sm">{team.abbreviation || '-'}</td>
				<td className="py-2 px-4 text-sm">
					<div className="flex justify-center items-center">
						<NavLink to={`${team.id}/edit`} className="text-lg text-orange-600 mr-2"><HiOutlinePencilAlt/></NavLink>
						<NavLink to="" className="text-lg text-red-600"><HiOutlineTrash/></NavLink>
					</div>
				</td>
			</tr>
		);
	});

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
		<PageContainer title="Equipas">
			<div className="flex flex-col sm:flex-row justify-between items-center mb-4">
				<div className="flex flex-1" />
				<div className="flex flex-1 justify-center my-4 mx-2">
					<SearchInput ref={searchInputRef} onSearch={onSearchHandler}/>
				</div>
				<div className="flex flex-1 justify-end">
					<FormButton style={ButtonStyle.SUCCESS} onClick={() => navigate('create')}>Adicionar</FormButton>
				</div>
			</div>
			<Table headerTitles={["Símbolo", "Nome", "Abreviatura", ""]} rows={mappedRows} isFetching={isFetching} />
			<TablePagination page={pagination.page} pages={pagination.pages} onPrevious={onPreviousClickHandler} onNext={onNextClickHandler} />
		</PageContainer>
	);
};

export default TeamsPage;