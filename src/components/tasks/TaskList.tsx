import { fetchTasks } from "@/api/tasks/fetch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useTask } from "@/contexts/TaskContext";
import { useUrlFilter } from "@/hooks/useUrlFilter";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { TaskItem } from "./TaskItem";

export const TaskList: React.FC = () => {
	const { filteredTasks, setFilter, filter } = useTask();
	const { updateFilterInUrl } = useUrlFilter({ setFilter });

	const handleFilterChange = (value: string) => {
		updateFilterInUrl(value);
	};

	useQuery({
		queryKey: ["tasks", filter],
		queryFn: () => fetchTasks({ status: filter }),
	});

	return (
		<Card className="w-full">
			<CardHeader className="flex flex-row items-center justify-between pb-2">
				<CardTitle>Minhas Tarefas</CardTitle>
				<Select value={filter} onValueChange={handleFilterChange}>
					<SelectTrigger
						className="task-filter w-[180px]"
						data-testid="task-filter"
					>
						<SelectValue placeholder="Filtrar por status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem
							value="all"
							data-testid="filter-all"
							className="filter-option-all"
						>
							Todas
						</SelectItem>
						<SelectItem
							value="pending"
							data-testid="filter-pending"
							className="filter-option-pending"
						>
							Pendentes
						</SelectItem>
						<SelectItem
							value="completed"
							data-testid="filter-completed"
							className="filter-option-completed"
						>
							Concluídas
						</SelectItem>
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
