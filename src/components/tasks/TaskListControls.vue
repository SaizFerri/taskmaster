<script setup lang="ts">
import { statusText } from '@/lib/const'
import { type CreateTask, TaskStatus } from '@/lib/types'
import { ArrowDownWideNarrow, ArrowUpNarrowWide, Plus } from 'lucide-vue-next'
import { ref } from 'vue'
import Button from '../ui/Button.vue'
import AddTaskDialog from './AddTaskDialog.vue'
import { type Sort } from './taskUtils'

const isAddTaskDialogOpen = ref(false)
defineProps<{ status?: TaskStatus; sort?: Sort }>()
const emit = defineEmits<{
  (e: 'onStatusChange', status?: TaskStatus): void
  (e: 'onSortChange'): void
  (e: 'onAddTask', data: CreateTask): void
}>()

function handleAddTask(data: CreateTask) {
  emit('onAddTask', data)
  isAddTaskDialogOpen.value = false
}

function handleFilterStatusChange(e: Event) {
  emit('onStatusChange', ((e.target as HTMLSelectElement).value as TaskStatus) || undefined)
}
</script>

<template>
  <nav class="flex items-start justify-between rounded-md bg-slate-100 p-2">
    <Button @click="isAddTaskDialogOpen = true" class="flex items-center gap-1">
      <Plus :size="16" aria-hidden />
      Add task</Button
    >
    <AddTaskDialog
      :open="isAddTaskDialogOpen"
      @onClose="isAddTaskDialogOpen = false"
      @onAddTask="handleAddTask"
    />
    <div class="flex items-center gap-2">
      <div>
        <label for="status">Filter: </label>
        <select
          name="status"
          id="status"
          class="rounded border border-border p-2"
          :value="status"
          @change="handleFilterStatusChange"
        >
          <option value="">All</option>
          <option :value="TaskStatus.PENDING">{{ statusText[TaskStatus.PENDING] }}</option>
          <option :value="TaskStatus.IN_PROGRESS">{{ statusText[TaskStatus.IN_PROGRESS] }}</option>
          <option :value="TaskStatus.COMPLETED">{{ statusText[TaskStatus.COMPLETED] }}</option>
        </select>
      </div>
      <div>
        <Button
          variant="secondary"
          size="small"
          class="flex items-center gap-1 text-sm"
          @click="emit('onSortChange')"
        >
          <ArrowUpNarrowWide v-show="sort === 'asc'" :size="16" aria-hidden />
          <ArrowDownWideNarrow v-show="sort === 'desc'" :size="16" aria-hidden />
          <span>Due date</span>
        </Button>
      </div>
    </div>
  </nav>
</template>
