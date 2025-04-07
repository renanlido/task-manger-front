import React, { useState } from 'react';
import { Task } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import { useTask } from '@/contexts/TaskContext';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
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
    <div className="flex items-center justify-between p-4 border rounded-lg mb-2 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors">
      <div className="flex items-center gap-3 flex-1">
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
            className={`flex-1 cursor-pointer ${task.completed ? 'line-through text-zinc-500' : ''}`}
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
            <Button variant="ghost" size="icon" onClick={handleEdit} disabled={task.completed}>
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

export default TaskItem;