import { Task } from "@/api/interfaces/task";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useTask } from "@/contexts/TaskContext";
import { Check, Pencil, Trash2, X } from "lucide-react";
import React, { useState } from "react";

interface TaskItemProps {
	task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
	const { toggleTaskStatus, updateTaskTitle, removeTask } = useTask();
	const [isEditing, setIsEditing] = useState(false);
	const [editedTitle, setEditedTitle] = useState(task.title);

	const handleToggleStatus = () => {
		toggleTaskStatus(task.id);
	};

	const handleEdit = () => {
		if (task.completed) return;

		setIsEditing(true);
	};

	const handleSaveEdit = () => {
		if (editedTitle.trim()) {
			updateTaskTitle(task.id, editedTitle);
			setIsEditing(false);
		}
	};

	const handleCancelEdit = () => {
		setEditedTitle(task.title);
		setIsEditing(false);
	};

	const handleDelete = () => {
		removeTask(task.id);
	};

	return (
		<div
			className={`task-item mb-2 flex items-center justify-between rounded-lg border bg-white p-4 transition-colors hover:bg-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-700 ${task.completed ? "completed" : "pending"}`}
			data-testid={`task-item-${task.id}`}
		>
			<div className="flex flex-1 items-center gap-3">
				<Checkbox
					checked={task.completed}
					onCheckedChange={handleToggleStatus}
					id={`task-${task.id}`}
					data-testid={`task-checkbox-${task.id}`}
					className="task-checkbox"
				/>

				{isEditing ? (
					<Input
						value={editedTitle}
						onChange={(e) => setEditedTitle(e.target.value)}
						className="task-edit-input flex-1"
						data-testid={`task-edit-input-${task.id}`}
						autoFocus
					/>
				) : (
					<label
						htmlFor={`task-${task.id}`}
						className={`task-title flex-1 cursor-pointer ${task.completed ? "text-zinc-500 line-through" : ""}`}
						data-testid={`task-title-${task.id}`}
					>
						{task.title}
					</label>
				)}
			</div>

			<div className="flex gap-2">
				{isEditing ? (
					<>
						<Button
							variant="ghost"
							size="icon"
							onClick={handleSaveEdit}
							data-testid={`task-save-${task.id}`}
							className="task-save-button"
						>
							<Check className="h-4 w-4" />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							onClick={handleCancelEdit}
							data-testid={`task-cancel-${task.id}`}
							className="task-cancel-button"
						>
							<X className="h-4 w-4" />
						</Button>
					</>
				) : (
					<>
						<Button
							variant="ghost"
							size="icon"
							onClick={handleEdit}
							disabled={task.completed}
							data-testid={`task-edit-${task.id}`}
							className="task-edit-button"
						>
							<Pencil className="h-4 w-4" />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							onClick={handleDelete}
							data-testid={`task-delete-${task.id}`}
							className="task-delete-button"
						>
							<Trash2 className="h-4 w-4" />
						</Button>
					</>
				)}
			</div>
		</div>
	);
};
