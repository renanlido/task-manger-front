import { Task, TaskStatus } from "@/api/interfaces/task";
import {
	changeStatusTask,
	changeTitleTask,
	createTask,
	deleteTask,
} from "@/api/tasks";
import { fetchTasks } from "@/api/tasks/fetch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";

interface TaskContextType {
	tasks: Task[];
	filteredTasks: Task[];
	filter: TaskStatus;
	setFilter: (filter: TaskStatus) => void;
	addTask: (
		title: string,
		description?: string,
	) => {
		success: boolean;
	};
	toggleTaskStatus: (id: string) => {
		success: boolean;
	};
	updateTaskTitle: (
		id: string,
		title: string,
		description?: string,
	) => {
		success: boolean;
	};
	removeTask: (id: string) => {
		success: boolean;
	};
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const { user } = useAuth();
	const [tasks, setTasks] = useState<Task[]>([]);
	const [filter, setFilter] = useState<TaskStatus>(TaskStatus.ALL);

	const queryClient = useQueryClient();

	const { data } = useQuery({
		queryKey: ["tasks", filter],
		queryFn: () => fetchTasks({ status: filter }),
	});

	useEffect(() => {
		setTasks(data?.data || []);
	}, [data]);

	const deleteTaskMutation = useMutation({
		mutationFn: deleteTask,
		onSuccess: () => {
			toast.success("Tarefa removida com sucesso");

			queryClient.invalidateQueries({ queryKey: ["tasks", filter] });
		},
		onError: () => {
			toast.error("Erro ao remover tarefa");
		},
	});

	const changeTitleMutation = useMutation({
		mutationFn: changeTitleTask,
		onSuccess: () => {
			toast.success("Tarefa atualizada com sucesso");

			queryClient.invalidateQueries({ queryKey: ["tasks", filter] });
		},
		onError: () => {
			toast.error("Erro ao atualizar tarefa");
		},
	});

	const changeStatusMutation = useMutation({
		mutationFn: changeStatusTask,
		onSuccess: () => {
			toast.success("Status da tarefa alterado com sucesso");
		},
		onError: () => {
			toast.error("Erro ao alterar status da tarefa");
		},
	});

	const createTaskMutation = useMutation({
		mutationFn: createTask,
		onSuccess: () => {
			toast.success("Tarefa criada com sucesso");

			queryClient.invalidateQueries({ queryKey: ["tasks", filter] });
		},
		onError: () => {
			toast.error("Erro ao criar tarefa");
		},
	});

	const filteredTasks = tasks.filter((task) => {
		if (filter === "all") return true;
		if (filter === "completed") return task.completed;
		if (filter === "pending") return !task.completed;
		return true;
	});

	const addTask = (title: string, description?: string) => {
		if (!user) return { success: false };

		const newTask: Task = {
			id: Date.now().toString(),
			title,
			completed: false,
			status: TaskStatus.PENDING,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};

		setTasks((prevTasks) => [...prevTasks, newTask]);

		createTaskMutation.mutate({
			title,
			description,
		});

		return { success: createTaskMutation.isSuccess };
	};

	const toggleTaskStatus = (id: string) => {
		const status = tasks.find((task) => task.id === id)?.completed
			? TaskStatus.PENDING
			: TaskStatus.COMPLETED;

		setTasks((prevTasks) =>
			prevTasks.map((task) =>
				task.id === id ? { ...task, completed: !task.completed } : task,
			),
		);

		changeStatusMutation.mutate({
			id,
			status,
		});

		return { success: changeStatusMutation.isSuccess };
	};

	const updateTaskTitle = (id: string, title: string, description?: string) => {
		setTasks((prevTasks) =>
			prevTasks.map((task) =>
				task.id === id ? { ...task, title, description } : task,
			),
		);

		changeTitleMutation.mutate({
			id,
			title,
			description,
		});

		return { success: changeTitleMutation.isSuccess };
	};

	const removeTask = (id: string) => {
		setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

		deleteTaskMutation.mutate({
			id,
		});

		return { success: deleteTaskMutation.isSuccess };
	};

	return (
		<TaskContext.Provider
			value={{
				tasks,
				filteredTasks,
				filter,
				setFilter,
				addTask,
				toggleTaskStatus,
				updateTaskTitle,
				removeTask,
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
