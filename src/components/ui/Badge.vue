<script lang="ts" setup>
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const badge = cva('inline-block rounded px-1 py-[2px] text-xs font-bold', {
  variants: {
    variant: {
      default: 'bg-gray-200 text-gray-600',
      info: 'bg-blue-100 text-blue-600',
      success: 'bg-green-100 text-green-600'
    }
  }
})

export type BadgeProps = VariantProps<typeof badge>

withDefaults(defineProps<{ variant?: BadgeProps['variant'] }>(), { variant: 'default' })
</script>

<template>
  <div :class="cn(badge({ variant }))">
    <slot></slot>
  </div>
</template>
