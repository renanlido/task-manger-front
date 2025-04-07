import React, { createContext, ReactNode, useContext, useState } from "react";
import { User } from "../types";

interface AuthContextType {
	user: User | null;
	isAuthenticated: boolean;
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

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated: !!user,
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
