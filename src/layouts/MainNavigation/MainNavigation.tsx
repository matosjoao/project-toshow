import { useRef, useState } from "react";
import MainNavigationMenuItem from "./MainNavigationMenuItem";
import useOnClickOutside from "../../hooks/useOnClickOutside";

const MainNavigation: React.FC = () => {
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const userProfileMenuRef = useRef<HTMLDivElement>(null);
    const userMobileMenuRef = useRef<HTMLDivElement>(null);

    const toggleProfileMenu = () => {
        setIsProfileMenuOpen(currentState => !currentState);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(currentState => !currentState);
    };

    useOnClickOutside(userProfileMenuRef, () => {
        setIsProfileMenuOpen(false);
    });

    useOnClickOutside(userMobileMenuRef, () => {
        setIsMobileMenuOpen(currentState => !currentState);
    });

	return (
        <header className="flex flex-none h-16 items-center justify-center bg-gradient-to-r from-blue-800 to-purple-700">
            <div className="flex flex-1 justify-between items-center">
                <div className={`hidden md:flex items-center`}>
                    <div className="flex w-28 h-full justify-center">
                        <img src="https://source.unsplash.com/random/30x30" alt="Logo" className="w-12 h-12 rounded-full" />
                    </div>
                    <nav>
                        <ul className="flex md:space-x-4 lg:space-x-6">
                            <li className="hover:scale-[1.1]"><MainNavigationMenuItem path="/" title="Dashboard"/></li>
                            <li className="hover:scale-[1.1]"><MainNavigationMenuItem path="/players" title="Jogadores"/></li>
                            <li className="hover:scale-[1.1]"><MainNavigationMenuItem path="/games" title="Jogos"/></li>
                            <li className="hover:scale-[1.1]"><MainNavigationMenuItem path="/templates" title="Templates"/></li>
                        </ul>
                    </nav>
                </div>
                <div className={`relative md:hidden ml-8`}>
                    <div className="text-white ">
                        <button onClick={toggleMobileMenu}>
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" height="2em" width="2em">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <path d="M4 8h16M4 16h16" />
                            </svg>
                        </button>
                    </div>
                    {isMobileMenuOpen && <div ref={userMobileMenuRef} className="absolute left-0 w-48 rounded-lg shadow-lg bg-white z-50">
                        <nav>
                            <ul className="py-2">
                                <li className="text-md text-gray-800 font-thin px-4 py-2 hover:bg-gray-200 cursor-pointer">Dashboard</li>
                                <li className="text-md text-gray-800 font-thin px-4 py-2 hover:bg-gray-200 cursor-pointer">Jogadores</li>
                                <li className="text-md text-gray-800 font-thin px-4 py-2 hover:bg-gray-200 cursor-pointer">Jogos</li>
                                <li className="text-md text-gray-800 font-thin px-4 py-2 hover:bg-gray-200 cursor-pointer">Templates</li>
                            </ul>
                        </nav>
                    </div>}
                </div>
                <div className="relative mx-4">
                    <button className="flex items-center p-2 hover:scale-[1.1]" onClick={toggleProfileMenu}>
                        <span className="mr-2 text-white text-md font-thin">Username</span>
                        <img src="https://source.unsplash.com/random/30x30" alt="Profile" className="w-8 h-8 rounded-full" />
                    </button>
                    {isProfileMenuOpen && <div ref={userProfileMenuRef} className="absolute right-0 w-48 rounded-lg shadow-lg bg-white z-50">
                        <ul className="py-2">
                            <li className="text-md text-gray-800 font-thin px-4 py-2 hover:bg-gray-200 cursor-pointer">Perfil</li>
                            <li className="text-md text-gray-800 font-thin px-4 py-2 hover:bg-gray-200 cursor-pointer">Sair</li>
                        </ul>
                    </div>}
                </div>
            </div>
        </header>
	);
};

export default MainNavigation;