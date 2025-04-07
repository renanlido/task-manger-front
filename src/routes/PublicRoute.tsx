import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function PublicRoute() {
	const { isAuthenticated } = useAuth();
	const location = useLocation();

	const from = location.state?.from || { pathname: "/tasks" };

	if (isAuthenticated) {
		return <Navigate to={from} replace />;
	}

	return <Outlet />;
}
