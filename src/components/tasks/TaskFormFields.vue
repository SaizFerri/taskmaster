<script setup lang="ts" generic="T extends CreateTaskForm">
import type { CreateTaskForm, FormFields } from '@/lib/types'
import FormInput from '../ui/FormInput.vue'
import FormTextarea from '../ui/FormTextarea.vue'

defineProps<{
  form: FormFields<T>
}>()
</script>

<template>
  <FormInput
    id="title"
    label="Title"
    :field="form.title"
    placeholder="Integrate PayPal"
    autocomplete="off"
  />
  <FormTextarea
    id="description"
    label="Description"
    :field="form.description"
    :placeholder="`To integrate PayPal do:\n1. Get API Key\n2. Use it\n3. Ship it`"
    autocomplete="off"
  />
  <FormInput id="dueDate" label="Due date" :field="form.dueDate" type="date" />
</template>
