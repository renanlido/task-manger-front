export enum TaskStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
	ALL = 'all',
}

export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
	completed: boolean
  createdAt: string
  updatedAt: string
}