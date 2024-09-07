<script setup lang="ts">
import { statusText } from '@/lib/const'
import type { CreateTask, TaskStatus } from '@/lib/types'
import { ArrowDownWideNarrow, ArrowUpNarrowWide } from 'lucide-vue-next'
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
  <nav class="rounded-md bg-slate-100 p-2">
    <Button @click="isAddTaskDialogOpen = true">Add task</Button>
    <AddTaskDialog
      :open="isAddTaskDialogOpen"
      @onClose="isAddTaskDialogOpen = false"
      @onAddTask="handleAddTask"
    />
    <div class="flex items-center gap-2">
      <div>
        <label for="status">Filter: </label>
        <select name="status" id="status" :value="status" @change="handleFilterStatusChange">
          <option value="">All</option>
          <option value="pending">{{ statusText['pending'] }}</option>
          <option value="inProgress">{{ statusText['inProgress'] }}</option>
          <option value="completed">{{ statusText['completed'] }}</option>
        </select>
      </div>
      <div>
        <Button
          variant="secondary"
          size="small"
          class="flex items-center gap-1 text-sm"
          @click="emit('onSortChange')"
        >
          <ArrowUpNarrowWide v-show="sort === 'asc'" :size="16" />
          <ArrowDownWideNarrow v-show="sort === 'desc'" :size="16" />
          <span>Due date</span>
        </Button>
      </div>
    </div>
  </nav>
</template>
