<script setup lang="ts">
import { statusText } from '@/lib/const'
import { TaskStatus, type Sort } from '@/lib/types'
import { ArrowDownWideNarrow, ArrowUpNarrowWide, Plus } from 'lucide-vue-next'
import Button from '../ui/Button.vue'

defineProps<{ status?: TaskStatus; sort?: Sort }>()
const emit = defineEmits<{
  (e: 'onStatusChange', status?: TaskStatus): void
  (e: 'onSortChange'): void
  (e: 'onAddTask'): void
}>()

function handleFilterStatusChange(e: Event) {
  emit('onStatusChange', ((e.target as HTMLSelectElement).value as TaskStatus) || undefined)
}
</script>

<template>
  <nav class="flex flex-wrap items-start justify-between gap-4 rounded-md bg-slate-100 p-2">
    <Button @click="$emit('onAddTask')" class="flex items-center gap-1">
      <Plus :size="16" aria-hidden />
      Add task</Button
    >
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
