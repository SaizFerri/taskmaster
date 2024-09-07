import { z } from 'zod'

export type Sort = 'asc' | 'desc'

export const CreateTaskSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  dueDate: z.string().date()
})

export type CreateTaskForm = z.infer<typeof CreateTaskSchema>
