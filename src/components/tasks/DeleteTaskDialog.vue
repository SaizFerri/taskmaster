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
}

function handleClose() {
  emit('onClose', false)
}
</script>

<template>
  <Dialog :open="open" @onClose="handleClose" title="Delete task">
    <p>Are sure that you want to delete this task?</p>
    <div class="mt-6 flex gap-2">
      <Button variant="destructive" @click="handleDelete">Delete</Button>
      <Button variant="secondary" @click="handleClose">Cancel</Button>
    </div>
  </Dialog>
</template>
