import { NavLink } from "react-router-dom";
import { FormBadge } from "../../../components/form";
import { HiOutlineTrash, HiOutlinePencilAlt, HiMenuAlt2 } from "react-icons/hi";
import { Player } from "../types";

interface Props {
    player: Player;
    index: number;
    isLastRow: boolean;
}

const PlayerTableRow: React.FC<Props> = ({player, index, isLastRow}) => {
    return (
        <tr key={player.id} className={`${index % 2 !== 0 ? 'bg-slate-50' : ''} ${isLastRow ? 'border-b-[1px] border-gray-300' : ''} h-10`}>
            <td className="py-2 px-4 text-sm">
                {player.photo ? (
                    <img src={player.photo} alt={`Foto-${player.name}`} className="w-8 h-8 rounded-full object-contain"/> 
                ) : (
                    <FormBadge classes="w-8 h-8" letter={player.name.substring(0, 1)} />
                )}
            </td>
            <td className="py-2 px-4 text-sm">{player.name}</td>
            <td className="py-2 px-4 text-sm">{player.number}</td>
            <td className="py-2 px-4 text-sm">{player.position}</td>
            <td className="py-2 px-4 text-sm">{player.level}</td>
            <td className="py-2 px-4 text-sm">
                <div className="flex justify-center items-center">
                    <NavLink to={`${player.id}`} className="text-lg text-purple-600 mr-2"><HiMenuAlt2/></NavLink>
                    <NavLink to={`${player.id}/edit`} className="text-lg text-orange-600 mr-2"><HiOutlinePencilAlt/></NavLink>
                    <NavLink to="" className="text-lg text-red-600"><HiOutlineTrash/></NavLink>
                </div>
            </td>
        </tr>
    );
};

export default PlayerTableRow;
