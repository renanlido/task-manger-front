import React from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { TaskProvider } from "./contexts/TaskContext";
import AuthPage from "./pages/AuthPage";
import { TasksPage } from "./pages/TasksPage";

const AppContent: React.FC = () => {
	const { isAuthenticated } = useAuth();

	return isAuthenticated ? <TasksPage /> : <AuthPage />;
};

function App() {
	return (
		<AuthProvider>
			<TaskProvider>
				<AppContent />
			</TaskProvider>
		</AuthProvider>
	);
}

export default App;
