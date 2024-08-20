import MainNavigation from '../layouts/MainNavigation/MainNavigation';

const ErrorPage: React.FC = () => {
    // TODO:: Improve error page
	return (
		<div className="flex flex-col h-screen">
            <MainNavigation />
            <span>Ocorreu um erro.</span>
        </div>
	);
};

export default ErrorPage;