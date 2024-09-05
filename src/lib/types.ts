export type TaskStatus = 'pending' | 'inProgress' | 'completed'

export type Task = {
  id: string
  title: string
  description: string
  status: TaskStatus
  dueDate: Date
  createdAt: Date
}

export type CreateTask = Omit<Task, 'id' | 'createdAt'>
