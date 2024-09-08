<script setup lang="ts" generic="T extends CreateTaskForm">
import type { FormFields } from '@/lib/types'
import type { CreateTaskForm } from './taskUtils'
import Input from '../ui/Input.vue'
import Textarea from '../ui/Textarea.vue'

defineProps<{
  form: FormFields<T>
}>()
</script>

<template>
  <div>
    <label for="title" class="text-sm font-semibold leading-none">Title</label>
    <Input
      id="title"
      v-model="form.title.value"
      placeholder="Integrate PayPal"
      autocomplete="off"
      class="mt-2"
    />
    <span v-show="form.title.error" class="text-xs text-red-600">{{ form.title.error }}</span>
  </div>
  <div>
    <label for="description" class="text-sm font-semibold leading-none">Description</label>
    <Textarea
      id="description"
      v-model="form.description.value"
      :placeholder="`To integrate PayPal do:\n1. Get API Key\n2. Use it\n3. Ship it`"
      autocomplete="off"
      class="mt-2"
    />
    <span v-show="form.description.error" class="text-xs text-red-600">{{
      form.description.error
    }}</span>
  </div>
  <div>
    <label for="dueDate" class="text-sm font-semibold leading-none">Due date</label>
    <Input id="dueDate" v-model="form.dueDate.value" type="date" class="mt-2" />
    <span v-show="form.dueDate.error" class="text-xs text-red-600">{{ form.dueDate.error }}</span>
  </div>
</template>
