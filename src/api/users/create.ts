import { API_ROUTES } from "../constants";

type CreateUser = {
	name: string;
	email: string;
	password: string;
}


interface CreateUserResponse {
	data: {id: string} | null;
	error: string | null;
}

export const createUser = async (user: CreateUser): Promise<CreateUserResponse> => {

	const response = await fetch(`${API_ROUTES.AUTH}/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	});

	if (!response.ok) {
		return {
			data: null,
			error: "Falha ao criar usuário",
		};
	}

	const data = await response.json() as {id: string};

	return {
		data,
		error: null
	};
};
