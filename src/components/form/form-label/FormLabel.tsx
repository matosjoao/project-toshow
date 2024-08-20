interface Props {
    label: string;
    children: React.ReactNode;
    containerClassesNames?: string;
}

const FormLabel: React.FC<Props> = ({label, children, containerClassesNames = ''}) => {
    return (
        <div className={`flex flex-col my-2 ${containerClassesNames}`}>
            <label className="block text-gray-700 text-sm font-bold mb-2">
                {label}
            </label>
            {children}
        </div>
    );
};
  
export default FormLabel;