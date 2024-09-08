import type { TaskSchema } from '@/components/tasks/taskUtils'
import type { z } from 'zod'

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'inProgress',
  COMPLETED = 'completed'
}

export type Task = z.infer<typeof TaskSchema>

export type CreateTask = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>
export type EditTask = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>

export type FormField<Value> = {
  value: Value
  error: string
}

export type FormFields<Input> = {
  [K in keyof Input]: FormField<Input[K]>
}
