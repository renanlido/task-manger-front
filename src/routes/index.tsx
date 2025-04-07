import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import NotFoundPage from "../pages/NotFoundPage";
import { TasksPage } from "../pages/TasksPage";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

// Definindo as rotas da aplicação
const router = createBrowserRouter([
	{
		path: "/",
		element: <PublicRoute />,
		children: [
			{
				path: "/",
				element: <AuthPage />,
			},
			{
				path: "/login",
				element: <AuthPage />,
			},
		],
	},
	{
		path: "/",
		element: <PrivateRoute />,
		children: [
			{
				path: "/tasks",
				element: <TasksPage />,
			},
		],
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
]);

export function AppRoutes() {
	return <RouterProvider router={router} />;
}
