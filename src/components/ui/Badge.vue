<script lang="ts" setup>
import type { TaskStatus } from '@/lib/types'
import { cn } from '@/lib/utils'

type Props = {
  variant: TaskStatus
}

withDefaults(defineProps<Props>(), { variant: 'pending' })
</script>

<template>
  <div
    :class="
      cn('inline-block rounded px-1 py-[2px] text-xs font-bold', {
        'bg-gray-200 text-gray-600': variant === 'pending',
        'bg-blue-100 text-blue-600': variant === 'inProgress',
        'bg-green-100 text-green-600': variant === 'completed'
      })
    "
  >
    <slot></slot>
  </div>
</template>
