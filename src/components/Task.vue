<script lang="ts" setup>
import { statusText } from '@/lib/const'
import type { Task } from '@/lib/types'
import Badge from './ui/Badge.vue'
import { format } from 'date-fns'

type Props = Task

defineProps<Props>()
</script>

<template>
  <div class="rounded-md border border-slate-200 bg-white p-4">
    <div class="mb-2 flex items-center gap-2">
      <span class="text-lg font-bold">{{ title }}</span>
      <Badge :variant="status">
        {{ statusText[status] }}
      </Badge>
    </div>
    <p class="mb-2 text-sm">{{ description }}</p>
    <span class="text-sm">{{ format(dueDate, 'MMMM d, yyyy') }}</span>
  </div>
</template>
