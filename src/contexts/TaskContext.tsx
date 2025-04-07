import React, {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { Task, TaskStatus, TaskStatusEnum } from "../types";
import { useAuth } from "./AuthContext";

interface TaskContextType {
	tasks: Task[];
	filteredTasks: Task[];
	setFilter: (filter: TaskStatus) => void;
	addTask: (title: string) => void;
	toggleTaskStatus: (id: string) => void;
	updateTaskTitle: (id: string, title: string) => void;
	deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const { user } = useAuth();
	const [tasks, setTasks] = useState<Task[]>([]);
	const [filter, setFilter] = useState<TaskStatus>(TaskStatusEnum.ALL);
	useEffect(() => {
		if (user) {
			const initialTasks: Task[] = [
				{
					id: "1",
					title: "Completar o projeto React",
					completed: false,
					userId: user.id,
					createdAt: new Date().toISOString(),
				},
				{
					id: "2",
					title: "Estudar TypeScript",
					completed: true,
					userId: user.id,
					createdAt: new Date().toISOString(),
				},
			];
			setTasks(initialTasks);
		} else {
			setTasks([]);
		}
	}, [user]);

	const filteredTasks = tasks.filter((task) => {
		if (filter === "all") return true;
		if (filter === "completed") return task.completed;
		if (filter === "pending") return !task.completed;
		return true;
	});

	const addTask = (title: string) => {
		if (!user) return;

		const newTask: Task = {
			id: Date.now().toString(),
			title,
			completed: false,
			userId: user.id,
			createdAt: new Date().toISOString(),
		};

		setTasks((prevTasks) => [...prevTasks, newTask]);
	};

	const toggleTaskStatus = (id: string) => {
		setTasks((prevTasks) =>
			prevTasks.map((task) =>
				task.id === id ? { ...task, completed: !task.completed } : task,
			),
		);
	};

	const updateTaskTitle = (id: string, title: string) => {
		setTasks((prevTasks) =>
			prevTasks.map((task) => (task.id === id ? { ...task, title } : task)),
		);
	};

	const deleteTask = (id: string) => {
		setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
	};

	return (
		<TaskContext.Provider
			value={{
				tasks,
				filteredTasks,
				setFilter,
				addTask,
				toggleTaskStatus,
				updateTaskTitle,
				deleteTask,
			}}
		>
			{children}
		</TaskContext.Provider>
	);
};

export const useTask = (): TaskContextType => {
	const context = useContext(TaskContext);
	if (context === undefined) {
		throw new Error("useTask must be used within a TaskProvider");
	}
	return context;
};
