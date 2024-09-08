<script setup lang="ts">
import Task from '@/components/tasks/Task.vue'
import { statusText } from '@/lib/const'
import type { EditTask, Task as TTask } from '@/lib/types'
import { TaskStatus } from '@/lib/types'
import { computed } from 'vue'

const props = defineProps<{
  tasks: TTask[]
}>()

defineEmits<{
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
</script>

<template>
  <div class="grid min-h-screen grid-cols-[repeat(3,minmax(300px,1fr))] gap-2 overflow-x-auto">
    <div class="flex flex-col gap-2 rounded-md bg-slate-100 p-2">
      <h2 class="text font-bold">{{ statusText[TaskStatus.PENDING] }}</h2>
      <Task
        v-for="task in tasksByStatus[TaskStatus.PENDING]"
        :key="task.id"
        :task="task"
        @onEdit="(id, data) => $emit('editTask', id, data)"
        @onRemove="(id) => $emit('removeTask', id)"
      />
    </div>

    <div class="flex flex-col gap-2 rounded-md bg-slate-100 p-2">
      <h2 class="text font-bold">{{ statusText[TaskStatus.IN_PROGRESS] }}</h2>
      <Task
        v-for="task in tasksByStatus[TaskStatus.IN_PROGRESS]"
        :key="task.id"
        :task="task"
        @onEdit="(id, data) => $emit('editTask', id, data)"
        @onRemove="(id) => $emit('removeTask', id)"
      />
    </div>

    <div class="flex flex-col gap-2 rounded-md bg-slate-100 p-2">
      <h2 class="text font-bold">{{ statusText[TaskStatus.COMPLETED] }}</h2>
      <Task
        v-for="task in tasksByStatus[TaskStatus.COMPLETED]"
        :key="task.id"
        :task="task"
        @onEdit="(id, data) => $emit('editTask', id, data)"
        @onRemove="(id) => $emit('removeTask', id)"
      />
    </div>
  </div>
</template>
