import nookies from "nookies";
import { API_ROUTES } from "../constants";
import { TaskStatus } from "../interfaces/task";

type ChangeStatusTask = {
	id: string;
	status: TaskStatus;
}


interface ChangeStatusTaskResponse {
	data: {id: string} | null;
	error: string | null;
}

export const changeStatusTask = async (task: ChangeStatusTask): Promise<ChangeStatusTaskResponse> => {
	const {token} = nookies.get(null, "token");

	if (!token) {
		return {
			data: null,
			error: "Token não encontrado",
		};
	}

	const response = await fetch(`${API_ROUTES.TASKS}/${task.id}/status/${task.status}`, {
		method: "PATCH",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		console.log(response.body)

		return {
			data: null,
			error: "Falha ao alterar status da tarefa",
		};
	}

	const data = await response.json() as {id: string};

	return {
		data,
		error: null,
	};
};
