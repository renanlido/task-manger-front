import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

import logo from "@/assets/logo.svg";

import { AuthLoginContent } from "./components/AuthLoginContent";
import { AuthRegisterContent } from "./components/AuthRegisterContent";

const AuthForm: React.FC = () => {
	return (
		<div className="flex min-h-screen items-center justify-center p-4">
			<Card className="w-full max-w-md p-4">
				<CardHeader>
					<CardTitle className="flex flex-col items-center justify-center gap-2 text-center text-2xl">
						<img src={logo} alt="Logo" className="h-20 w-20" />
						Gerenciador de Tarefas
					</CardTitle>
					<CardDescription className="text-center">
						Faça login ou crie uma conta para gerenciar suas tarefas
					</CardDescription>
				</CardHeader>
				<Tabs defaultValue="login" className="w-full px-5">
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger
							value="login"
							className="auth-tab-login cursor-pointer"
							data-testid="auth-tab-login"
						>
							Login
						</TabsTrigger>
						<TabsTrigger
							value="register"
							className="auth-tab-register cursor-pointer"
							data-testid="auth-tab-register"
						>
							Cadastro
						</TabsTrigger>
					</TabsList>

					<TabsContent value="login">
						<AuthLoginContent />
					</TabsContent>

					<TabsContent value="register">
						<AuthRegisterContent />
					</TabsContent>
				</Tabs>
			</Card>
		</div>
	);
};

export default AuthForm;
