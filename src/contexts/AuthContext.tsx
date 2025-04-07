import React, {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

import nookies from "nookies";

import { User } from "../types";

interface AuthContextType {
	user: User | null;
	isAuthenticated: boolean;
	token: () => string | null;
	login: (email: string, password: string) => Promise<void>;
	register: (name: string, email: string, password: string) => Promise<void>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null);

	const login = async (email: string, password: string) => {
		nookies.set(null, "token", "1234567890", {
			path: "/",
			maxAge: 30 * 24 * 60 * 60,
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
		});

		return new Promise<void>((resolve) => {
			setTimeout(() => {
				setUser({
					id: "1",
					name: "Usuário Teste",
					email,
				});
				resolve();
			}, 1000);
		});
	};

	const register = async (name: string, email: string, password: string) => {
		return new Promise<void>((resolve) => {
			setTimeout(() => {
				setUser({
					id: "1",
					name,
					email,
				});
				resolve();
			}, 1000);
		});
	};

	const logout = () => {
		setUser(null);
	};

	const validateSession = () => {
		const { token } = nookies.get(null, "token");

		if (!token) {
			nookies.destroy(null, "token");
			setUser(null);
		}
		return { token };
	};

	const parseToken = () => {
		const { token } = validateSession();

		// TODO: Descriptografar JWT e retornar o usuário
		// TODO: Salvar o usuário no contexto
		// TODO: Retornar o usuário

		console.log(token);

		return {
			id: "1",
			name: "Usuário Teste",
			email: "teste@teste.com",
		};
	};

	const token = () => {
		const { token } = validateSession();

		return token;
	};

	useEffect(() => {
		const data = parseToken();
		if (data) {
			setUser(data);
		}
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated: !!user,
				token,
				login,
				register,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
