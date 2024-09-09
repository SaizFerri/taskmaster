<script setup lang="ts">
import TaskList from '@/components/tasks/TaskList.vue'
import TaskListControls from '@/components/tasks/TaskListControls.vue'
import { TaskStatus, type CreateTask, type EditTask, type Sort, type Task } from '@/lib/types'
import { useTasksStore } from '@/stores/tasks'
import { computed, ref } from 'vue'
import AddTaskDialog from './AddTaskDialog.vue'
import { Loader2 } from 'lucide-vue-next'

const status = ref<TaskStatus | undefined>(undefined)
const sort = ref<Sort>('asc')
const store = useTasksStore()
const isAddTaskDialogOpen = ref(false)
const addTaskStatus = ref(TaskStatus.PENDING)

const tasks = computed(() => {
  const filterByStatus =
    status.value !== undefined ? (task: Task) => task.status === status.value : () => true

  const sortByDate = (a: Task, b: Task) => {
    if (sort.value === 'asc') {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    } else if (sort.value === 'desc') {
      return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
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
  store.add({ ...data, status: addTaskStatus.value })
  isAddTaskDialogOpen.value = false
  addTaskStatus.value = TaskStatus.PENDING
}

function editTask(id: Task['id'], data: EditTask) {
  store.edit(id, data)
}

function removeTask(id: Task['id']) {
  store.remove(id)
}
</script>

<template>
  <TaskListControls
    :status="status"
    :sort="sort"
    @onSortChange="updateDateSort"
    @onStatusChange="updateStatusFilter"
    @onAddTask="isAddTaskDialogOpen = true"
  />
  <div v-if="store.isLoading" class="my-8 flex flex-col items-center justify-center gap-4">
    <Loader2 class="animate-spin" />
    Loading tasks...
  </div>
  <TaskList
    v-if="!store.isLoading"
    :tasks="tasks"
    @onAddTask="
      (status: TaskStatus) => {
        addTaskStatus = status
        isAddTaskDialogOpen = true
      }
    "
    @onRemoveTask="removeTask"
    @onEditTask="editTask"
  />
  <AddTaskDialog
    :open="isAddTaskDialogOpen"
    @onClose="isAddTaskDialogOpen = false"
    @onAddTask="addTask"
  />
</template>
