import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { tasks as initialTasks } from '@/lib/const'
import type { CreateTask, Task } from '@/lib/types'
import { generateRandomId } from '@/lib/utils'

export const useTasksStore = defineStore('tasks', () => {
  let tasks = ref(initialTasks)

  function add(task: CreateTask) {
    tasks.value.push({
      ...task,
      id: generateRandomId(),
      createdAt: new Date()
    })
  }

  function remove(id: Task['id']) {
    tasks.value = tasks.value.filter((task) => task.id !== id)
  }

  return { tasks, add, remove }
})
