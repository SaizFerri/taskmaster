<script lang="ts" setup>
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ClassValue } from 'clsx'
import type { Component } from 'vue'

const button = cva('rounded-md font-semibold transition ease-linear text-sm', {
  variants: {
    variant: {
      primary: 'bg-primary text-foreground-button hover:bg-brand-400/90',
      secondary: 'bg-slate-200 text-foreground-button hover:bg-slate-300/90',
      destructive: 'bg-red-600 text-white hover:bg-red-700/90'
    },
    size: {
      default: 'px-4 py-2',
      small: 'px-3 py-2'
    }
  }
})

export type ButtonProps = VariantProps<typeof button>

withDefaults(
  defineProps<{
    variant?: ButtonProps['variant']
    size?: ButtonProps['size']
    as?: Component | string
  }>(),
  {
    as: 'button',
    variant: 'primary',
    size: 'default'
  }
)
</script>

<template>
  <component :is="as" :class="cn(button({ variant, size }), $props.class as ClassValue)">
    <slot></slot>
  </component>
</template>
