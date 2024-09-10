<script setup lang="ts" generic="T extends string | undefined">
import type { FormField } from '@/lib/types'
import Label from './Label.vue'
import Textarea from './Textarea.vue'

defineProps<{ id: string; label: string; field: FormField<T> }>()
</script>

<template>
  <div>
    <Label :for="id">{{ label }}</Label>
    <Textarea :id="id" v-model="field.value" class="mt-2" v-bind="$attrs" />
    <span v-show="field.error" class="text-xs text-red-600">{{ field.error }}</span>
  </div>
</template>
