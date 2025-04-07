import nookies from "nookies";
import { API_ROUTES } from "../constants";

type ChangeTitleTask = {
	id: string;
	title: string;
	description?: string;
}


interface ChangeTitleTaskResponse {
	data: {id: string} | null;
	error: string | null;
}

export const changeTitleTask = async (task: ChangeTitleTask): Promise<ChangeTitleTaskResponse> => {
	const {token} = nookies.get(null, "token");

	if (!token) {
		return {
			data: null,
			error: "Token não encontrado",
		};
	}

	const response = await fetch(`${API_ROUTES.TASKS}/${task.id}/title`, {
		method: "PATCH",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(task),
	});

	if (!response.ok) {
		return {
			data: null,
			error: "Falha ao alterar título da tarefa",
		};
	}

	const data = await response.json() as {id: string};

	return {
		data,
		error: null,
	};
};
