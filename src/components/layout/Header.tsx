import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut } from "lucide-react";
import React from "react";

export const Header: React.FC = () => {
	const { user, logout } = useAuth();

	return (
		<header className="sticky top-0 z-10 border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
			<div className="container mx-auto flex items-center justify-between px-4 py-3">
				<div className="flex items-center gap-2">
					<h1 className="text-xl font-bold">Gerenciador de Tarefas</h1>
				</div>

				{user && (
					<div className="flex items-center gap-4">
						<span className="hidden text-sm md:inline-block">
							Olu00e1, {user.name}
						</span>
						<Button variant="ghost" size="sm" onClick={logout}>
							<LogOut className="mr-2 h-4 w-4" />
							Sair
						</Button>
					</div>
				)}
			</div>
		</header>
	);
};
