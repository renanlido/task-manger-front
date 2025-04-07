import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useTask } from "@/contexts/TaskContext";
import { Plus } from "lucide-react";
import React, { useState } from "react";

export const TaskForm: React.FC = () => {
	const { addTask } = useTask();
	const [title, setTitle] = useState("");
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		if (!title.trim()) {
			setError("Por favor, insira um título para a tarefa");
			return;
		}

		addTask(title.trim());
		setTitle("");
	};

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>Nova Tarefa</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<div className="flex gap-2">
						<Input
							placeholder="O que você precisa fazer?"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="flex-1"
						/>
						<Button type="submit">
							<Plus className="mr-2 h-4 w-4" />
							Adicionar
						</Button>
					</div>
					{error && <p className="text-sm text-red-500">{error}</p>}
				</form>
			</CardContent>
		</Card>
	);
};
