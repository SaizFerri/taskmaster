<script setup lang="ts">
import { useForm } from '@/composables/useForm'
import type { CreateTask } from '@/lib/types'
import Button from '../ui/Button.vue'
import Dialog from '../ui/Dialog.vue'
import Input from '../ui/Input.vue'
import Textarea from '../ui/Textarea.vue'
import { CreateTaskSchema, type CreateTaskForm } from './taskUtils'

withDefaults(
  defineProps<{
    open: boolean
  }>(),
  {
    open: false
  }
)
const emit = defineEmits<{
  (e: 'onClose', open: boolean): void
  (e: 'onAddTask', data: CreateTask): void
}>()

const { form, handleSubmit, reset } = useForm<CreateTaskForm>({
  schema: CreateTaskSchema
})

const submit = handleSubmit((data) => {
  emit('onAddTask', {
    ...data,
    dueDate: new Date(data.dueDate),
    status: 'pending'
  })

  reset()
})

function handleClose() {
  reset()
  emit('onClose', false)
}
</script>

<template>
  <Dialog :open="open" @onClose="handleClose" title="Add new task">
    <form class="flex flex-col gap-4" @submit.prevent="submit">
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
        <span v-show="form.dueDate.error" class="text-xs text-red-600">{{
          form.dueDate.error
        }}</span>
      </div>
      <div class="mt-6 flex gap-2">
        <Button>Create</Button>
        <Button variant="secondary" type="button" @click="handleClose">Cancel</Button>
      </div>
    </form>
  </Dialog>
</template>
