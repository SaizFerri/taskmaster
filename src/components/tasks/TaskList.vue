<script setup lang="ts">
import Task from '@/components/tasks/Task.vue'
import { statusText } from '@/lib/const'
import type { EditTask, Task as TaskType } from '@/lib/types'
import { TaskStatus } from '@/lib/types'
import { Plus } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import Button from '../ui/Button.vue'

const props = defineProps<{
  tasks: TaskType[]
}>()

const emit = defineEmits<{
  onAddTask: [status: TaskStatus]
  onEditTask: [id: TaskType['id'], task: EditTask]
  onRemoveTask: [id: TaskType['id']]
}>()

const tasksByStatus = computed(() =>
  props.tasks.reduce<Record<TaskStatus, TaskType[]>>(
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

const draggedTask = ref<TaskType>()

const onDragStart = (task: TaskType) => {
  draggedTask.value = task
}

const onDrop = (status: TaskStatus) => {
  if (draggedTask && draggedTask.value?.status !== status) {
    emit('onEditTask', draggedTask.value!.id, { ...draggedTask.value!, status })
  }

  draggedTask.value = undefined
}
</script>

<template>
  <div class="grid min-h-screen grid-cols-[repeat(3,minmax(300px,1fr))] gap-2 overflow-x-auto">
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
        @onEdit="(id, data) => $emit('onEditTask', id, data)"
        @onRemove="(id) => $emit('onRemoveTask', id)"
        draggable="true"
        @dragstart="onDragStart(task)"
      />
      <Button
        class="bg-white/50 text-center text-foreground-button hover:bg-white"
        @click="$emit('onAddTask', status)"
        v-bind:[`data-test-task-add-${status}`]="''"
        ><Plus :size="16" class="inline-block"
      /></Button>
    </div>
  </div>
</template>
