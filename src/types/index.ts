export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  userId: string;
  createdAt: string;
}


export enum TaskStatusEnum {
	ALL = 'all',
	PENDING = 'pending',
	COMPLETED = 'completed',
}

export type TaskStatus = TaskStatusEnum;