import { TaskStatus } from '@/lib/types'
import { z } from 'zod'

export type Sort = 'asc' | 'desc'

export const TaskSchema = z.object({
  id: z.string().min(1),
  status: z.nativeEnum(TaskStatus),
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  dueDate: z.coerce.date()
})

export const CreateTaskSchema = TaskSchema.pick({ title: true, description: true, dueDate: true })

export type CreateTaskForm = z.infer<typeof CreateTaskSchema>

export const EditTaskSchema = TaskSchema.pick({
  title: true,
  description: true,
  dueDate: true,
  status: true
})

export type EditTaskForm = z.infer<typeof EditTaskSchema>
