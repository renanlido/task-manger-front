import React, {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

import { jwtDecode } from "jwt-decode";
import nookies from "nookies";
import { toast } from "sonner";
import { login as loginApi } from "../api/auth/login";
import { createUser } from "../api/users";

export type User = {
	id: string;
	name: string;
	email: string;
};
interface AuthContextType {
	user: User | null;
	isAuthenticated: boolean;
	token: () => string | null;
	login: (
		email: string,
		password: string,
	) => Promise<{
		success: boolean;
	}>;
	register: (
		name: string,
		email: string,
		password: string,
	) => Promise<{
		success: boolean;
	}>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null);

	const login = async (email: string, password: string, isRegister = false) => {
		const response = await loginApi({ email, password });

		if (response.error || !response.data) {
			toast.error(response.error || "Erro ao fazer login");
			return { success: false };
		}

		nookies.set(null, "token", response.data.accessToken, {
			path: "/",
			maxAge: 30 * 24 * 60 * 60,
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
		});

		const user = parseToken();

		if (user) {
			setUser({
				id: user.id,
				name: user.name,
				email: user.email,
			});
		}

		if (isRegister) {
			toast.success("Login realizado com sucesso");
		}

		return { success: true };
	};

	const register = async (name: string, email: string, password: string) => {
		const response = await createUser({ name, email, password });

		if (response.error || !response.data) {
			toast.error(response.error || "Erro ao criar usuário");
			return { success: false };
		}

		const loginResponse = await login(email, password, true);

		if (!loginResponse.success) {
			toast.error("Erro ao fazer login");
			return { success: false };
		}

		toast.success("Usuário criado com sucesso");

		return { success: true };
	};

	const logout = () => {
		nookies.destroy(null, "token");
		setUser(null);
	};

	const parseToken = () => {
		const { token } = validateSession();

		if (!token) {
			return null;
		}

		const decodedToken = jwtDecode<{
			sub: string;
			name: string;
			email: string;
		}>(token);

		return {
			id: decodedToken.sub,
			name: decodedToken.name,
			email: decodedToken.email,
		};
	};

	const validateSession = () => {
		const { token } = nookies.get(null, "token");

		if (!token) {
			nookies.destroy(null, "token");
			setUser(null);
		}
		return { token };
	};

	const token = () => {
		const { token } = validateSession();

		return token;
	};

	useEffect(() => {
		const data = parseToken();

		if (data) {
			setUser({
				id: data.id,
				name: data.name,
				email: data.email,
			});
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
