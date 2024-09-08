<script setup lang="ts">
import { useForm } from '@/composables/useForm'
import { TaskStatus, type EditTask, type Task } from '@/lib/types'
import Button from '../ui/Button.vue'
import Dialog from '../ui/Dialog.vue'
import TaskFormFields from './TaskFormFields.vue'
import { EditTaskSchema, type EditTaskForm } from './taskUtils'
import { statusText, tasks } from '@/lib/const'
import { watch, watchEffect } from 'vue'

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

const { form, handleSubmit, reset } = useForm<EditTaskForm>(EditTaskSchema, {
  defaultValues: getDefaultValues(props.task)
})

watch(
  () => props.task,
  () => reset(getDefaultValues(props.task))
)

const submit = handleSubmit((data) => {
  emit('onEditTask', {
    ...data,
    dueDate: new Date(data.dueDate)
  })

  handleClose()
})

function handleClose() {
  reset()
  emit('onClose', false)
}

function getDefaultValues(task: Task) {
  return { ...task, dueDate: task.dueDate.toISOString().split('T')[0] }
}
</script>

<template>
  <Dialog :open="open" @onClose="handleClose" title="Edit task">
    <form class="flex flex-col gap-4" @submit.prevent="submit">
      <div>
        <label for="status" class="block text-sm font-semibold leading-none">Status</label>
        <select
          name="status"
          id="status"
          class="border-border mt-2 w-full rounded border p-2"
          v-model="form.status.value"
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
