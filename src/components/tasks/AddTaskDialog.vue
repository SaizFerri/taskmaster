<script setup lang="ts">
import { useForm } from '@/composables/useForm'
import { CreateTaskSchema, TaskStatus, type CreateTask, type CreateTaskForm } from '@/lib/types'
import Button from '../ui/Button.vue'
import Dialog from '../ui/Dialog.vue'
import TaskFormFields from './TaskFormFields.vue'

withDefaults(
  defineProps<{
    open: boolean
  }>(),
  {
    open: false
  }
)
const emit = defineEmits<{
  onClose: [open: boolean]
  onAddTask: [data: CreateTask]
}>()

const { form, handleSubmit, reset } = useForm<CreateTaskForm>(CreateTaskSchema)

const submit = handleSubmit((data) => {
  emit('onAddTask', {
    ...data,
    dueDate: data.dueDate,
    status: TaskStatus.PENDING
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
      <TaskFormFields :form="form" />
      <div class="mt-6 flex gap-2">
        <Button>Create</Button>
        <Button variant="secondary" type="button" @click="handleClose">Cancel</Button>
      </div>
    </form>
  </Dialog>
</template>
