interface Props {
    letter: string;
    classes?: string;
}

const FormBadge: React.FC<Props> = ({letter, classes}) => {
    return (
        <div className={`flex items-center justify-center w-12 h-12 rounded-full bg-gray-500 text-white text-center font-bold text-2xl ${classes}`}>
            {letter.toUpperCase()}
        </div>
    );
};
  
export default FormBadge;