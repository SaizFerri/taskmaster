import { LocalStorageTaskService } from '@/api/tasks/LocalStorageTaskService'
import { RemoteTaskService } from '@/api/tasks/RemoteTaskService'
import type { CreateTask, EditTask, Task } from '@/lib/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const service = getService()

export const useTasksStore = defineStore('tasks', () => {
  const isLoading = ref(false)
  const tasks = ref<Task[]>([])

  async function initialize() {
    isLoading.value = true
    const data = await service.getAll()
    tasks.value = data
    isLoading.value = false
  }

  async function add(task: CreateTask) {
    await service.create(task)
    await refetchTasks()
  }

  async function edit(id: Task['id'], data: EditTask) {
    await service.update(id, data)
    await refetchTasks()
  }

  async function remove(id: Task['id']) {
    try {
      await service.remove(id)
    } catch (error) {
      console.log(error)
      return
    }
    await refetchTasks()
  }

  async function refetchTasks() {
    tasks.value = await service.getAll()
  }

  return { tasks, isLoading, add, edit, remove, initialize }
})

export const useTaskStoreSubscribers = () => {
  const state = useTasksStore()
  state.initialize()
}

function getService() {
  switch (import.meta.env.VITE_STORAGE) {
    case 'server':
      return new RemoteTaskService()
    case 'local':
    default:
      return new LocalStorageTaskService()
  }
}
