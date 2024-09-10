import { LocalStorageTaskService } from '@/api/tasks/LocalStorageTaskService'
import { RemoteTaskService } from '@/api/tasks/RemoteTaskService'
import type { CreateTask, EditTask, Task } from '@/lib/types'
import { useAuthStore } from '@/stores/auth'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const service = getService()

export const useTasksStore = defineStore('tasks', () => {
  const isLoading = ref(false)
  const tasks = ref<Task[]>([])
  const authStore = useAuthStore()

  async function initialize() {
    isLoading.value = true
    const data = await service.getAll(authStore.user!.uid)
    tasks.value = data
    isLoading.value = false
  }

  watch(
    () => authStore.isAuthenticated,
    () => {
      if (authStore.isAuthenticated) {
        initialize()
      }
    },
    { immediate: true }
  )

  async function add(task: CreateTask) {
    await service.create(authStore.user!.uid, task)
    await refetchTasks()
  }

  async function edit(id: Task['id'], data: EditTask) {
    await service.update(authStore.user!.uid, id, data)
    await refetchTasks()
  }

  async function remove(id: Task['id']) {
    try {
      await service.remove(authStore.user!.uid, id)
    } catch (error) {
      console.log(error)
      return
    }
    await refetchTasks()
  }

  async function refetchTasks() {
    tasks.value = await service.getAll(authStore.user!.uid)
  }

  return { tasks, isLoading, add, edit, remove, initialize }
})

function getService() {
  switch (import.meta.env.VITE_STORAGE) {
    case 'server':
      return new RemoteTaskService()
    case 'local':
    default:
      return new LocalStorageTaskService()
  }
}
