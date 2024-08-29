import { FormFile, FormInput, FormSelect } from "../../../components/form";
import { BaseSelectOption } from "../../../components/form/form-select/FormSelect";
import { formatDateTime } from "../../../utils/dates";
import { Player } from "../types";

interface Props {
    data?: Player
    levels: BaseSelectOption[]
    positions: BaseSelectOption[]
}

const Form: React.FC<Props> = ({data, levels, positions}) => {
    const birthDay = data ? formatDateTime(new Date(data.birthday), 'YYYY-MM-DD') : '';

    return (
        <>
            <FormFile
                label="Foto" 
                id="photo"
                required={false} />
            <FormInput 
                label="Nome completo" 
                id="fullName" 
                inputProps={{
                    placeholder: "Nome completo do jogador",
                    autoComplete: "off",
                    required: true
                }} 
                defaultValue={data?.fullName}
            />
            <FormInput 
                label="Nome" 
                id="name" 
                inputProps={{
                    placeholder: "Nome camisola/onze(...) do jogador",
                    autoComplete: "off",
                    required: true
                }} 
                defaultValue={data?.name}
            />
            <div className="flex flex-1">
                <FormInput 
                    label="Número" 
                    id="number"
                    containerClassesNames="flex-1"
                    inputProps={{
                        placeholder: "Número camisola/onze(...) do jogador",
                        autoComplete: "off",
                        required: true,
                        type: "number"
                    }} 
                    defaultValue={data?.number.toString()}
                />
                <FormInput 
                    label="Data de nascimento" 
                    id="birthday" 
                    containerClassesNames="ml-2 flex-1"
                    inputProps={{
                        placeholder: "Data de nascimento",
                        required: true,
                        type: "date",
                        autoComplete: "off"
                    }}  
                    defaultValue={birthDay}
                />
            </div>
            <div className="flex flex-1">
                <FormSelect 
                    label="Escalão" 
                    id="level"
                    options={levels}
                    required={true}
                    placeholder="Escalão do jogador"
                    containerClassesNames="flex-1"
                    defaultSelectedOptionId={data?.levelId}
                />
                <FormSelect 
                    label="Posição" 
                    id="position"
                    options={positions}
                    required={true}
                    placeholder="Posição do jogador"
                    containerClassesNames="flex-1 ml-2"
                    defaultSelectedOptionId={data?.positionId}
                />
            </div>
        </>
    );
};

export default Form;
