import { API_ROUTES } from "../constants";

type Login = {
	email: string;
	password: string;
}


interface LoginResponse {
	data: {accessToken: string} | null;
	error: string | null;
}

export const login = async (login: Login): Promise<LoginResponse> => {
	const response = await fetch(`${API_ROUTES.AUTH}/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(login),
	});

	if (!response.ok) {
		console.log(response.body)

		return {
			data: null,
			error: "Falha ao fazer login",
		};
	}

	const data = await response.json() as {accessToken: string};

	return {
		data,
		error: null
	};
};
