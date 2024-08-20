import { Outlet } from 'react-router-dom';
import MainNavigation from './MainNavigation/MainNavigation';

const RootLayout: React.FC = () => {
	return (
		<div className="flex flex-col h-screen">
            <MainNavigation />
            <Outlet/>
        </div>
	);
};

export default RootLayout;