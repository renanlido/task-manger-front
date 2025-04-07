import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useTask } from "@/contexts/TaskContext";
import { Task } from "@/types";
import { Check, Pencil, Trash2, X } from "lucide-react";
import React, { useState } from "react";

interface TaskItemProps {
	task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
	const { toggleTaskStatus, updateTaskTitle, deleteTask } = useTask();
	const [isEditing, setIsEditing] = useState(false);
	const [editedTitle, setEditedTitle] = useState(task.title);

	const handleToggleStatus = () => {
		toggleTaskStatus(task.id);
	};

	const handleEdit = () => {
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
		deleteTask(task.id);
	};

	return (
		<div className="mb-2 flex items-center justify-between rounded-lg border bg-white p-4 transition-colors hover:bg-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-700">
			<div className="flex flex-1 items-center gap-3">
				<Checkbox
					checked={task.completed}
					onCheckedChange={handleToggleStatus}
					id={`task-${task.id}`}
				/>

				{isEditing ? (
					<Input
						value={editedTitle}
						onChange={(e) => setEditedTitle(e.target.value)}
						className="flex-1"
						autoFocus
					/>
				) : (
					<label
						htmlFor={`task-${task.id}`}
						className={`flex-1 cursor-pointer ${task.completed ? "text-zinc-500 line-through" : ""}`}
					>
						{task.title}
					</label>
				)}
			</div>

			<div className="flex gap-2">
				{isEditing ? (
					<>
						<Button variant="ghost" size="icon" onClick={handleSaveEdit}>
							<Check className="h-4 w-4" />
						</Button>
						<Button variant="ghost" size="icon" onClick={handleCancelEdit}>
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
						>
							<Pencil className="h-4 w-4" />
						</Button>
						<Button variant="ghost" size="icon" onClick={handleDelete}>
							<Trash2 className="h-4 w-4" />
						</Button>
					</>
				)}
			</div>
		</div>
	);
};
