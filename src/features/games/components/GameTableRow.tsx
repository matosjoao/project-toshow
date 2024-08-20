import { NavLink } from "react-router-dom";
import { FormBadge } from "../../../components/form";
import { IconPencil, IconTrash, IconDetailsMore } from "../../../icons";
import { Game } from "../types";

interface Props {
    game: Game;
    index: number;
    isLastRow: boolean;
}

const GameTableRow: React.FC<Props> = ({game, index, isLastRow}) => {
    return (
        <tr key={game.id} className={`${index % 2 !== 0 ? 'bg-slate-50' : ''} ${isLastRow ? 'border-b-[1px] border-gray-300' : ''} h-10`}>
            <td className="py-2 px-4 text-sm">
                <div className="flex flex-1 items-center mx-2">
                    <div className="flex flex-1 flex-col items-center justify-center font-semibold">
                        {game.homeTeamLogo ? (
                            <img src={game.homeTeamLogo} alt={`Logo ${game.homeTeamName}`} className="w-8 h-8 rounded-full object-contain"/> 
                        ) : (
                            <FormBadge classes="w-8 h-8 mr-2" letter={game.homeTeamName.substring(0, 1)} />
                        )}
                        <span>{game.homeTeamName.substring(0, 15)} - {game.homeTeamLevel}</span>
                    </div>
                    <span className="mx-4 font-bold text-xs">X</span>
                    <div className="flex flex-1 flex-col items-center justify-center font-semibold">
                        {game.awayTeamLogo ? (
                            <img src={game.awayTeamLogo} alt={`Logo ${game.awayTeamName}`} className="w-8 h-8 rounded-full object-contain"/>
                        ) : (
                            <FormBadge classes="w-8 h-8 mr-2" letter={game.awayTeamName.substring(0, 1)} />
                        )}
                        <span>{game.awayTeamName.substring(0, 15)} - {game.awayTeamLevel}</span>
                    </div>
                </div>
            </td>
            <td className="py-2 px-4 text-sm">{game.startDate}</td>
            <td className="py-2 px-4 text-sm">{game.address || '-'}</td> 
            <td className="py-2 px-4 text-sm">
                <div className="flex justify-center items-center">
                    <NavLink to={`${game.id}`} className="w-5 h-5 text-purple-600 mr-2"><IconDetailsMore/></NavLink>
                    <NavLink to={`${game.id}/edit`} className="w-5 h-5 text-orange-600 mr-2"><IconPencil/></NavLink>
                    <NavLink to="" className="w-5 h-5 text-red-600 "><IconTrash/></NavLink>
                </div>
            </td>
        </tr>
    );
};

export default GameTableRow;
