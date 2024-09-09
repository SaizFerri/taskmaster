import type { CreateTask, EditTask, Task } from '@/lib/types'

export interface TaskService {
  getAll(): Promise<Task[]>
  create(task: CreateTask): void
  update(id: Task['id'], task: EditTask): void
  remove(id: Task['id']): void
}
