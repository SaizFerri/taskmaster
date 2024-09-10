import type { TaskService } from '@/api/tasks/TaskService'
import { TaskSchema, type CreateTask, type EditTask, type Task } from '@/lib/types'
import { generateRandomId } from '@/lib/utils'
import { z } from 'zod'

const STORAGE_KEY = 'tasks'

export class LocalStorageTaskService implements TaskService {
  async create(userId: string, task: CreateTask): Promise<void> {
    const tasks = await this.getAll()
    tasks.push({
      ...task,
      id: generateRandomId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId
    })
    this.save(tasks)
  }

  async update(_: string, id: Task['id'], data: EditTask): Promise<void> {
    const tasks = await this.getAll()
    const taskIndex = tasks.findIndex((t) => t.id === id)

    if (taskIndex === undefined || taskIndex === -1) {
      throw new Error('Task not found')
    }

    tasks[taskIndex] = { ...tasks[taskIndex], ...data, updatedAt: new Date().toISOString() }

    this.save(tasks)
  }

  async remove(_: string, id: Task['id']): Promise<void> {
    const tasks = await this.getAll()
    this.save(tasks.filter((task) => task.id !== id))
  }

  async getAll(userId?: string) {
    let state: Task[] = []

    try {
      const savedTasks = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
      state = z
        .array(TaskSchema)
        .parse(savedTasks)
        .filter((task) => {
          if (userId) {
            return task.userId === userId
          }
          return true
        })
    } catch (error) {
      console.error('Failed to parse saved tasks', error)
    }

    return state
  }

  private save(tasks: Task[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }
}
