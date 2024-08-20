interface Props {
    title: string;
    children: React.ReactNode;
}

const PageContainer: React.FC<Props> = ({children, title}) => {
    return (
        <div className="flex flex-col flex-1 bg-slate-100">
            <div className="flex flex-none flex-col bg-gradient-to-r from-blue-800 to-purple-700 px-40 py-6">
                <h1 className="text-2xl font-semibold text-left text-white">{title}</h1>
            </div>
			<div className="px-14 md:px-40">
                <div className="bg-white shadow-sm rounded-lg px-8 pt-6 pb-8 mb-4 mt-24">
                    {children}
                </div>
			</div>
		</div>
    );
};
  
export default PageContainer;