import type { TaskService } from '@/api/tasks/TaskService'
import type { Task, CreateTask, EditTask } from '@/lib/types'

export class RemoteTaskService implements TaskService {
  async getAll(): Promise<Task[]> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`)
    if (!response.ok) {
      throw new Error('There was an error loading the tasks')
    }
    const data = await response.json()
    return data
  }
  async create(task: CreateTask) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    if (!response.ok) {
      throw new Error('There was an error creating the tasks')
    }
  }
  async update(id: Task['id'], task: EditTask) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    if (!response.ok) {
      throw new Error('There was an error updating the tasks')
    }
  }
  async remove(id: Task['id']) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) {
      throw new Error('There was an error deleting the tasks')
    }
  }
}
