import { TaskSchema } from '@/components/tasks/taskUtils'
import type { CreateTask, EditTask, Task } from '@/lib/types'
import { generateRandomId } from '@/lib/utils'
import { defineStore } from 'pinia'
import SuperJSON from 'superjson'
import { ref } from 'vue'
import { z } from 'zod'

export const useTasksStore = defineStore('tasks', () => {
  let tasks = ref(getInitialState())

  function add(task: CreateTask) {
    tasks.value.push({
      ...task,
      id: generateRandomId(),
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  function edit(id: Task['id'], data: EditTask) {
    tasks.value = tasks.value.reduce<Task[]>((acc, task) => {
      if (task.id === id) {
        return [...acc, { ...task, ...data, updatedAt: new Date() }]
      }

      return [...acc, task]
    }, [])
  }

  function remove(id: Task['id']) {
    tasks.value = tasks.value.filter((task) => task.id !== id)
  }

  return { tasks, add, edit, remove }
})

export const useTaskStoreSubscribers = () => {
  const state = useTasksStore()

  state.$subscribe((_, { tasks }) => {
    localStorage.setItem('tasks', SuperJSON.stringify(tasks))
  })
}

function getInitialState() {
  let state: Task[] = []

  try {
    const savedTasks = SuperJSON.parse(localStorage.getItem('tasks') ?? '[]')
    state = z.array(TaskSchema).parse(savedTasks)
  } catch (error) {
    console.error('Failed to parse saved tasks')
  }

  return state
}
