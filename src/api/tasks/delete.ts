import nookies from "nookies";
import { API_ROUTES } from "../constants";

type DeleteTask = {
	id: string;
}


interface DeleteTaskResponse {
	data: {id: string} | null;
	error: string | null;
}

export const deleteTask = async (task: DeleteTask): Promise<DeleteTaskResponse> => {
	const {token} = nookies.get(null, "token");

	if (!token) {
		return {
			data: null,
			error: "Token não encontrado",
		};
	}

	const response = await fetch(`${API_ROUTES.TASKS}/${task.id}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		console.log(response.body)

		return {
			data: null,
			error: "Falha ao deletar tarefa",
		};
	}

	const data = await response.json() as {id: string};

	return {
		data,
		error: null,
	};
};
