<script lang="ts" setup>
import { statusText } from '@/lib/const'
import type { Task } from '@/lib/types'
import Badge from './ui/Badge.vue'
import { format } from 'date-fns'
import { Trash2 } from 'lucide-vue-next'

type Props = Task

defineProps<Props>()
defineEmits<{
  (e: 'onRemove', id: Task['id']): void
}>()
</script>

<template>
  <div class="rounded-md border border-slate-200 bg-white p-4">
    <div class="mb-2 flex items-center justify-between gap-2">
      <div class="flex items-center gap-2">
        <span class="text-lg font-bold">{{ title }}</span>
        <Badge :variant="status">
          {{ statusText[status] }}
        </Badge>
      </div>
      <button
        class="rounded-md p-2 outline-offset-2 outline-background transition ease-linear hover:bg-gray-100"
        @click="$emit('onRemove', id)"
      >
        <Trash2 :size="16" class="stroke-red-600" />
      </button>
    </div>
    <p class="mb-2 text-sm">{{ description }}</p>
    <span class="text-sm">{{ format(dueDate, 'MMMM d, yyyy') }}</span>
  </div>
</template>
