import { Task, TaskStatus } from "@/api/interfaces/task";
import nookies from "nookies";
import { API_ROUTES } from "../constants";


interface FetchTask {
	status?: TaskStatus
}

interface FetchTasksResponse {
	data: Task[] | null;
	error: string | null;
}

export const fetchTasks = async (options?: FetchTask): Promise<FetchTasksResponse> => {
	const {token} = nookies.get(null, "token");

	if (!token) {
		return {
			data: null,
			error: "Token não encontrado",
		};
	}

	const queryParams = new URLSearchParams();

	if (options?.status && options.status !== TaskStatus.ALL) {
		queryParams.set("status", options.status);
	}

	const queryString = queryParams.toString();

	const url = queryString ? `${API_ROUTES.TASKS}?${queryString}` : API_ROUTES.TASKS;

	const response = await fetch(url, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		return {
			data: null,
			error: "Falha ao buscar tarefas",
		};
	}

	const data = await response.json() as Task[];

	return {
		data,
		error: null,
	};
};
