<script setup lang="ts" generic="T extends string | undefined">
import type { FormField } from '@/lib/types'
import Input from './Input.vue'
import Label from './Label.vue'

defineProps<{ id: string; label: string; field: FormField<T> }>()
defineEmits<{
  input: [value: string]
}>()
</script>

<template>
  <div>
    <Label :for="id">{{ label }}</Label>
    <Input
      :id="id"
      :value="field.value"
      @input="(value: string) => $emit('input', value)"
      class="mt-2"
      v-bind="$attrs"
    />
    <span v-show="field.error" class="text-xs text-red-600">{{ field.error }}</span>
  </div>
</template>
