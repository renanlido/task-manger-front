import React from 'react';
import { useTask } from '@/contexts/TaskContext';
import TaskItem from './TaskItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TaskStatus } from '@/types';

const TaskList: React.FC = () => {
  const { filteredTasks, filter, setFilter } = useTask();

  const handleFilterChange = (value: string) => {
    setFilter(value as TaskStatus);
  };

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
            <SelectItem value="completed">Concluu00eddas</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {filteredTasks.length === 0 ? (
          <div className="text-center py-6 text-zinc-500">
            {filter === 'all' 
              ? 'Vocu00ea ainda nu00e3o tem tarefas. Crie uma nova tarefa abaixo.'
              : filter === 'pending'
                ? 'Vocu00ea nu00e3o tem tarefas pendentes.'
                : 'Vocu00ea nu00e3o tem tarefas concluu00eddas.'}
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

export default TaskList;