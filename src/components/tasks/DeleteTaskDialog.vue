<script setup lang="ts">
import Button from '../ui/Button.vue'
import Dialog from '../ui/Dialog.vue'

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
  (e: 'onDeleteTask'): void
}>()

const handleDelete = () => {
  emit('onDeleteTask')
  handleClose()
}

function handleClose() {
  emit('onClose', false)
}
</script>

<template>
  <Dialog :open="open" @onClose="handleClose" title="Delete task">
    <p>Are sure that you want to delete this task?</p>
    <div class="mt-6 flex gap-2">
      <Button variant="destructive" @click="handleDelete" data-test-task-confirm-delete
        >Delete</Button
      >
      <Button variant="secondary" @click="handleClose" data-test-task-confirm-cancel>Cancel</Button>
    </div>
  </Dialog>
</template>
