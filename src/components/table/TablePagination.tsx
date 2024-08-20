import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface Props {
    page: number;
    pages: number;
    onPrevious: () => void;
    onNext: () => void;
}

const TablePagination: React.FC<Props> = ({page, pages, onPrevious, onNext}) => {
    return (
        <div className="flex justify-between items-center py-4">
            <div><span className="text-gray-800 text-sm font-medium mr-2">Pág. {page} de {pages}</span></div>
            <div className="flex items-center">
                <button className="flex items-center px-2 py-2 bg-white text-gray-800 text-sm rounded-lg shadow-sm font-medium hover:bg-gray-200 mx-2 disabled:bg-slate-100" disabled={(page <= 1) ? true : false} onClick={onPrevious}>
                <FaAngleLeft width="1rem" height="1rem" /> Anterior
                </button>
                <button className="flex items-center px-2 py-2 bg-white text-gray-800 text-sm rounded-lg shadow-sm font-medium hover:bg-gray-200 disabled:bg-slate-100" disabled={(page >= pages) ? true : false} onClick={onNext}>
                    Próxima <FaAngleRight width="1rem" height="1rem" />
                </button>
            </div>
        </div>
    );
};
  
export default TablePagination;