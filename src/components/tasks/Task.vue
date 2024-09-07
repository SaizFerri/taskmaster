<script lang="ts" setup>
import { statusText } from '@/lib/const'
import type { Task } from '@/lib/types'
import Badge from '@/components/ui/Badge.vue'
import { format } from 'date-fns'
import { Trash2 } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { ref } from 'vue'
import DeleteTaskDialog from './DeleteTaskDialog.vue'

type Props = Task & {
  showBadge?: boolean
}

withDefaults(defineProps<Props>(), { showBadge: false })
defineEmits<{
  (e: 'onRemove', id: Task['id']): void
}>()

const isDeleteTaskDialogOpen = ref(false)
</script>

<template>
  <div
    :class="
      cn('rounded-md border border-slate-200 bg-green-100 p-4', {
        'bg-white': status === 'pending',
        'bg-blue-100': status === 'inProgress',
        'bg-green-100': status === 'completed'
      })
    "
  >
    <div class="mb-2 flex items-start justify-between gap-2">
      <div class="flex items-center gap-2">
        <span class="text font-bold">{{ title }}</span>
        <Badge v-if="showBadge" :variant="status">
          {{ statusText[status] }}
        </Badge>
      </div>
      <button
        class="rounded-md p-1 transition ease-linear hover:bg-gray-100"
        @click="isDeleteTaskDialogOpen = true"
      >
        <Trash2 :size="16" class="stroke-red-600" />
      </button>
      <DeleteTaskDialog
        :open="isDeleteTaskDialogOpen"
        @onClose="isDeleteTaskDialogOpen = false"
        @onDeleteTask="$emit('onRemove', id)"
      />
    </div>
    <p class="mb-2 text-sm">{{ description }}</p>
    <div class="flex items-center gap-2">
      <span class="text-sm">{{ format(dueDate, 'MMMM d, yyyy') }}</span>
      <Badge v-if="Date.now() > dueDate.getTime()" variant="pending" class="bg-red-200 text-red-600"
        >Overdue</Badge
      >
    </div>
  </div>
</template>
