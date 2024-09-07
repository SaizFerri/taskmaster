<script lang="ts" setup>
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const button = cva('rounded-md font-semibold transition ease-linear', {
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

type ButtonProps = VariantProps<typeof button>

withDefaults(defineProps<{ variant?: ButtonProps['variant']; size?: ButtonProps['size'] }>(), {
  variant: 'primary',
  size: 'default'
})
</script>

<template>
  <button :class="cn(button({ variant, size }))">
    <slot></slot>
  </button>
</template>
