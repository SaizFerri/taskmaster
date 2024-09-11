import { isValid } from 'date-fns'
import { z } from 'zod'

export type Sort = 'asc' | 'desc'

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export type RegisterForm = z.infer<typeof RegisterSchema>

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'inProgress',
  COMPLETED = 'completed'
}

export const TaskSchema = z.object({
  id: z.string().min(1),
  userId: z.string(),
  status: z.nativeEnum(TaskStatus),
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  dueDate: z.preprocess((date) => {
    if (!date || typeof date !== 'string') {
      return undefined
    }
    const parsedDate = new Date(date)

    if (!isValid(parsedDate)) {
      return undefined
    } else {
      return parsedDate.toISOString()
    }
  }, z.string().datetime())
})

export const CreateTaskSchema = TaskSchema.pick({
  title: true,
  description: true,
  dueDate: true
})

export type CreateTaskForm = z.infer<typeof CreateTaskSchema>

export const EditTaskSchema = TaskSchema.pick({
  title: true,
  description: true,
  status: true,
  dueDate: true
})

export type EditTaskForm = z.infer<typeof EditTaskSchema>

export type Task = z.infer<typeof TaskSchema>

export type CreateTask = Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'userId'>
export type EditTask = Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'userId'>

export type FormField<Value> = {
  value: Value
  error: string
}

export type FormFields<Input> = {
  [K in keyof Input]: FormField<Input[K]>
}
