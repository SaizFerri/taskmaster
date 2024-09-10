import type { CreateTask, EditTask, Task } from '@/lib/types'

export interface TaskService {
  getAll(userId: string): Promise<Task[]>
  create(userId: string, task: CreateTask): void
  update(userId: string, id: Task['id'], task: EditTask): void
  remove(userId: string, id: Task['id']): void
}
