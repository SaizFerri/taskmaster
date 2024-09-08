import { tasks as initialTasks } from '@/lib/const'
import type { CreateTask, EditTask, Task } from '@/lib/types'
import { generateRandomId } from '@/lib/utils'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTasksStore = defineStore('tasks', () => {
  let tasks = ref(initialTasks)

  function add(task: CreateTask) {
    tasks.value.push({
      ...task,
      id: generateRandomId(),
      createdAt: new Date()
    })
  }

  function edit(id: Task['id'], data: EditTask) {
    tasks.value = tasks.value.reduce<Task[]>((acc, task) => {
      if (task.id === id) {
        return [...acc, { ...task, ...data }]
      }

      return [...acc, task]
    }, [])
  }

  function remove(id: Task['id']) {
    tasks.value = tasks.value.filter((task) => task.id !== id)
  }

  return { tasks, add, edit, remove }
})
