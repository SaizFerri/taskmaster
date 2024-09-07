<script setup lang="ts">
import TaskList from '@/components/tasks/TaskList.vue'
import TaskListControls from '@/components/tasks/TaskListControls.vue'
import type { CreateTask, Task, TaskStatus } from '@/lib/types'
import { useTasksStore } from '@/stores/tasks'
import { computed, ref } from 'vue'
import { type Sort } from './taskUtils'

const status = ref<TaskStatus | undefined>(undefined)
const sort = ref<Sort>('asc')
const store = useTasksStore()

const tasks = computed(() => {
  const filterByStatus =
    status.value !== undefined ? (task: Task) => task.status === status.value : () => true

  const sortByDate = (a: Task, b: Task) => {
    if (sort.value === 'asc') {
      return a.dueDate.getTime() - b.dueDate.getTime()
    } else if (sort.value === 'desc') {
      return b.dueDate.getTime() - a.dueDate.getTime()
    } else {
      return -1
    }
  }

  return store.tasks.filter(filterByStatus).sort(sortByDate)
})

function updateDateSort() {
  sort.value = sort.value === 'asc' ? 'desc' : 'asc'
}

function updateStatusFilter(newStatus?: TaskStatus) {
  status.value = newStatus
}

function addTask(data: CreateTask) {
  store.add(data)
  // window.scrollTo({ top: window.outerHeight, behavior: 'smooth' })
}

function removeTask(id: string) {
  store.remove(id)
}
</script>

<template>
  <TaskListControls
    :status="status"
    :sort="sort"
    @onSortChange="updateDateSort"
    @onStatusChange="updateStatusFilter"
    @onAddTask="addTask"
  />
  <TaskList :tasks="tasks" @removeTask="removeTask" />
</template>
