import { AuthProvider } from "./contexts/AuthContext";
import { TaskProvider } from "./contexts/TaskContext";
import { AppRoutes } from "./routes";

function App() {
	return (
		<AuthProvider>
			<TaskProvider>
				<AppRoutes />
			</TaskProvider>
		</AuthProvider>
	);
}

export default App;
