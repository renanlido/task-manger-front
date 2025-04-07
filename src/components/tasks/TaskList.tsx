import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useTask } from "@/contexts/TaskContext";
import { TaskStatus } from "@/types";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { TaskItem } from "./TaskItem";

export const TaskList: React.FC = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const filter = (searchParams.get("filter") as TaskStatus) || "all";

	const { filteredTasks, setFilter } = useTask();

	const handleFilterChange = (value: string) => {
		setSearchParams((params) => {
			params.set("filter", value);
			return params;
		});

		setFilter(value as TaskStatus);
	};

	useEffect(() => {
		setFilter(filter as TaskStatus);
	}, [filter]);

	return (
		<Card className="w-full">
			<CardHeader className="flex flex-row items-center justify-between pb-2">
				<CardTitle>Minhas Tarefas</CardTitle>
				<Select value={filter} onValueChange={handleFilterChange}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Filtrar por status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">Todas</SelectItem>
						<SelectItem value="pending">Pendentes</SelectItem>
						<SelectItem value="completed">Concluídas</SelectItem>
					</SelectContent>
				</Select>
			</CardHeader>
			<CardContent>
				{filteredTasks.length === 0 ? (
					<div className="py-6 text-center text-zinc-500">
						{filter === "all"
							? "Você ainda não tem tarefas. Crie uma nova tarefa abaixo."
							: filter === "pending"
								? "Você não tem tarefas pendentes."
								: "Você não tem tarefas concluídas."}
					</div>
				) : (
					<div className="space-y-2">
						{filteredTasks.map((task) => (
							<TaskItem key={task.id} task={task} />
						))}
					</div>
				)}
			</CardContent>
		</Card>
	);
};
