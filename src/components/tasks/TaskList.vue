<script setup lang="ts">
import Task from '@/components/tasks/Task.vue'
import { statusText } from '@/lib/const'
import type { EditTask, Task as TTask } from '@/lib/types'
import { TaskStatus } from '@/lib/types'
import { computed, ref } from 'vue'

const props = defineProps<{
  tasks: TTask[]
}>()

const emit = defineEmits<{
  editTask: [id: TTask['id'], task: EditTask]
  removeTask: [id: TTask['id']]
}>()

const tasksByStatus = computed(() =>
  props.tasks.reduce<Record<TaskStatus, TTask[]>>(
    (byStatus, task) => {
      return {
        ...byStatus,
        [task.status]: [...byStatus[task.status], task]
      }
    },
    {
      pending: [],
      inProgress: [],
      completed: []
    }
  )
)

const draggedTask = ref<TTask>()

const onDragStart = (task: TTask) => {
  draggedTask.value = task
}

const onDrop = (status: TaskStatus) => {
  if (draggedTask && draggedTask.value?.status !== status) {
    emit('editTask', draggedTask.value!.id, { ...draggedTask.value!, status })
  }

  draggedTask.value = undefined
}
</script>

<template>
  <div v-if="tasks.length === 0">
    <h2 class="mt-8 text-center text-xl font-semibold">
      There are not tasks. Click 'Add task' to create a new one.
    </h2>
  </div>
  <div
    v-if="tasks.length > 0"
    class="grid min-h-screen grid-cols-[repeat(3,minmax(300px,1fr))] gap-2 overflow-x-auto"
  >
    <div
      v-for="status in Object.values(TaskStatus)"
      class="flex flex-col gap-2 rounded-md bg-slate-100 p-2"
      @dragover.prevent
      @drop="onDrop(status)"
    >
      <h2 class="text font-bold">{{ statusText[status] }}</h2>
      <Task
        v-for="task in tasksByStatus[status]"
        :key="task.id"
        :task="task"
        @onEdit="(id, data) => $emit('editTask', id, data)"
        @onRemove="(id) => $emit('removeTask', id)"
        draggable="true"
        @dragstart="onDragStart(task)"
      />
    </div>
  </div>
</template>
