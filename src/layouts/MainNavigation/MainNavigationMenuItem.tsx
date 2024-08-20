import { NavLink } from "react-router-dom";

interface Props {
    path: string;
    title: string;
}

const MainNavigationMenuItem: React.FC<Props> = ({path, title}) => {
    const normalClassName = "text-white text-md font-thin p-2";

    return (
        <NavLink
            to={path}
            className={({ isActive }) =>
                isActive ? `underline underline-offset-4 ${normalClassName}` : normalClassName
            }
            end
        >
           {title}
        </NavLink>
    );
};
  
export default MainNavigationMenuItem;