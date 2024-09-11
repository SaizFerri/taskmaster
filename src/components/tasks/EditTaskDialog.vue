<script setup lang="ts">
import { useForm } from '@/composables/useForm'
import { statusText } from '@/lib/const'
import {
  EditTaskSchema,
  TaskStatus,
  type EditTask,
  type EditTaskForm,
  type Task
} from '@/lib/types'
import { watch } from 'vue'
import Button from '../ui/Button.vue'
import Dialog from '../ui/Dialog.vue'
import TaskFormFields from './TaskFormFields.vue'

const props = withDefaults(
  defineProps<{
    task: Task
    open: boolean
  }>(),
  {
    open: false
  }
)
const emit = defineEmits<{
  onClose: [open: boolean]
  onEditTask: [data: EditTask]
}>()

const { form, handleSubmit, reset, update } = useForm<EditTaskForm>(EditTaskSchema, {
  defaultValues: getDefaultValues(props.task)
})

watch(
  () => props.task,
  () => reset(getDefaultValues(props.task))
)

const submit = handleSubmit((data) => {
  emit('onEditTask', data)

  handleClose()
})

function handleClose() {
  emit('onClose', false)
}

function getDefaultValues(task: Task) {
  return { ...task, dueDate: new Date(task.dueDate).toISOString().split('T')[0] }
}
</script>

<template>
  <Dialog :open="open" @onClose="handleClose" title="Edit task">
    <form
      class="flex flex-col gap-4"
      @submit.prevent="submit"
      @input="
        update(
          ($event.target as HTMLInputElement).name as keyof EditTaskForm,
          ($event.target as HTMLInputElement).value
        )
      "
    >
      <div>
        <label for="status" class="block text-sm font-semibold leading-none">Status</label>
        <select
          id="status"
          name="status"
          :value="form.status.value"
          class="mt-2 w-full rounded border border-border p-2"
        >
          <option value="">All</option>
          <option :value="TaskStatus.PENDING">{{ statusText[TaskStatus.PENDING] }}</option>
          <option :value="TaskStatus.IN_PROGRESS">{{ statusText[TaskStatus.IN_PROGRESS] }}</option>
          <option :value="TaskStatus.COMPLETED">{{ statusText[TaskStatus.COMPLETED] }}</option>
        </select>
      </div>
      <TaskFormFields :form="form" />
      <div class="mt-6 flex gap-2">
        <Button>Save</Button>
        <Button variant="secondary" type="button" @click="handleClose">Cancel</Button>
      </div>
    </form>
  </Dialog>
</template>
