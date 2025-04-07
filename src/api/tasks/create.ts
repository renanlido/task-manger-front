import nookies from "nookies";
import { API_ROUTES } from "../constants";

type CreateTask = {
	title: string;
	description?: string;
}


interface CreateTaskResponse {
	data: {id: string} | null;
	error: string | null;
}

export const createTask = async (task: CreateTask): Promise<CreateTaskResponse> => {
	const {token} = nookies.get(null, "token");


	if (!token) {
		return {
			data: null,
			error: "Token não encontrado",
		};
	}

	const response = await fetch(API_ROUTES.TASKS, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(task),
	});

	if (!response.ok) {
		console.log(response.body)

		return {
			data: null,
			error: "Falha ao criar tarefa",
		};
	}

	const data = await response.json() as {id: string};

	return {
		data,
		error: null
	};
};
