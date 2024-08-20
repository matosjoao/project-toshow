import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { action as loginAction} from "./pages/login/action";
import { checkAuthLoader, tokenLoader } from "./utils/auth";
import LoginPage from "./pages/login/LoginPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import RootLayout from "./layouts/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import { TeamCreatePage, TeamEditPage, TeamsPage } from './pages/admin/teams';
import { GameCreatePage, GameDetailPage, GamesPage } from "./pages/games";
import { TemplateEditorPage, TemplatesPage } from "./pages/templates";

const router = createBrowserRouter([
	{
		path: '/',
		id: 'root',
		element: <RootLayout/>,
		errorElement: <ErrorPage />,
		loader: tokenLoader,
		children: [
			{ index: true, element: <DashboardPage/>, loader: checkAuthLoader },
			{
				path: 'templates',
				loader: checkAuthLoader,
				children: [
					{ index: true, element: <TemplatesPage /> },
					{ path: 'create',element: <TemplateEditorPage /> },
					{ path: ':templateId/edit', element: <TemplateEditorPage /> },
				]
			},
			{
				path: 'games',
				loader: checkAuthLoader,
				children: [
					{ index: true, element: <GamesPage /> },
					{ path: 'create', element: <GameCreatePage /> },
					{ path: ':gameId', element: <GameDetailPage /> },
				]
			},

			{
				path: 'teams',
				loader: checkAuthLoader,
				children: [
					{ index: true, element: <TeamsPage /> },
					{ path: 'create', element: <TeamCreatePage /> },
					{ path: ':teamId/edit', element: <TeamEditPage /> },
				]
			}
		],
	},
	{
		path: '/login',
		element: <LoginPage />,
		action: loginAction
	},
]);

const App: React.FC = () => (
	<RouterProvider router={router} />
);

export default App;
