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

export type FormField<Value extends string | number | Date = string> = {
  value: Value
  error: string
}

export type FormFields<Input> = Record<keyof Input, FormField>
