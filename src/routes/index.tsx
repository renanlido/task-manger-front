import { Route, Routes } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import NotFoundPage from "../pages/NotFoundPage";
import { TasksPage } from "../pages/TasksPage";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<PublicRoute />}>
				<Route index element={<AuthPage />} />
				<Route path="login" element={<AuthPage />} />
			</Route>
			<Route path="/" element={<PrivateRoute />}>
				<Route path="tasks" element={<TasksPage />} />
			</Route>
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
}
