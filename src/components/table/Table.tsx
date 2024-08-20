
interface Props {
    headerTitles: string[];
    rows?: JSX.Element[];
    isFetching?: boolean;
}

const Table: React.FC<Props> = ({headerTitles, rows, isFetching = false}) => {
    // TODO:: Set header titles th width 
    return (
        <div className="relative overflow-auto shadow-sm rounded-lg border-[1px] border-gray-300">
            <table className="min-w-full min-h-20 bg-white">
                <thead className="text-left text-gray-800 border-b-2 border-b-gray-300 bg-gray-300">
                    <tr>
                        {headerTitles.map((title, index) => <th key={index} className="py-2 px-4 capitalize text-sm font-medium">{title}</th> )}
                    </tr>
                </thead>
                <tbody className="relative">
                    {isFetching && (
                        <tr className="absolute inset-0 flex items-center justify-center bg-white opacity-50">
                            <td colSpan={headerTitles.length} className="py-2 px-4 text-sm text-center text-gray-800 font-bold">
                                A carregar...
                            </td>
                        </tr>
                    )}
                    {rows}
                    {(!isFetching && rows?.length === 0) && <tr><td colSpan={headerTitles.length} className="py-2 px-4 text-sm text-center">Sem registos</td></tr> }
                </tbody>
            </table>
        </div>
    );
};
  
export default Table;