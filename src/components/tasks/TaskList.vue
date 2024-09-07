<script setup lang="ts">
import Task from '@/components/tasks/Task.vue'
import { statusText } from '@/lib/const'
import type { TaskStatus, Task as TTask } from '@/lib/types'
import { computed } from 'vue'

const props = defineProps<{
  tasks: TTask[]
}>()

defineEmits<{
  (e: 'removeTask', id: TTask['id']): void
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
      <h2 class="text font-bold">{{ statusText['pending'] }}</h2>
      <Task
        v-for="task in tasksByStatus['pending']"
        :key="task.id"
        v-bind="task"
        @onRemove="(id) => $emit('removeTask', id)"
      />
    </div>

    <div class="flex flex-col gap-2 rounded-md bg-slate-100 p-2">
      <h2 class="text font-bold">{{ statusText['inProgress'] }}</h2>
      <Task
        v-for="task in tasksByStatus['inProgress']"
        :key="task.id"
        v-bind="task"
        @onRemove="(id) => $emit('removeTask', id)"
      />
    </div>

    <div class="flex flex-col gap-2 rounded-md bg-slate-100 p-2">
      <h2 class="text font-bold">{{ statusText['completed'] }}</h2>
      <Task
        v-for="task in tasksByStatus['completed']"
        :key="task.id"
        v-bind="task"
        @onRemove="(id) => $emit('removeTask', id)"
      />
    </div>
  </div>
</template>
