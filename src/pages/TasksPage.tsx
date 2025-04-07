import { Header } from "@/components/layout/Header";
import { TaskForm } from "@/components/tasks/TaskForm";
import { TaskList } from "@/components/tasks/TaskList";
import { TaskProvider } from "@/contexts/TaskContext";
import React from "react";

export const TasksPage: React.FC = () => {
	return (
		<div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-900">
			<Header />
			<main className="container mx-auto flex-1 px-4 py-6">
				<div className="mx-auto max-w-3xl space-y-6">
					<TaskProvider>
						<TaskList />
						<TaskForm />
					</TaskProvider>
				</div>
			</main>
		</div>
	);
};
