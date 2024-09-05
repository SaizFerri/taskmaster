<script setup lang="ts">
import Task from '@/components/Task.vue'
import Button from '@/components/ui/Button.vue'
import Dialog from '@/components/ui/Dialog.vue'
import { useTasksStore } from '@/stores/tasks'
import { ref } from 'vue'

const showModal = ref(false)
const store = useTasksStore()

function addTask() {
  store.add({
    title: 'New task',
    description: 'This is a new task',
    status: 'pending',
    dueDate: new Date('2024-09-30')
  })
  closeDialog()
  window.scrollTo({ top: window.outerHeight, behavior: 'smooth' })
}

function removeTask(id: string) {
  store.remove(id)
}

function closeDialog() {
  showModal.value = false
}
</script>

<!-- 
TODO:

- Render from state
- Sort by due date and status
- Filter by status
- Add task through a dialog
- Delete task with confirm dialog
-->

<template>
  <main class="space-y-4 p-8">
    <Button @click="showModal = true">Save</Button>
    <div v-for="task in store.tasks">
      <Task :key="task.id" v-bind="task" @onRemove="removeTask" />
    </div>
  </main>
  <Dialog :open="showModal" @onClose="showModal = false" title="My Modal">
    <Button @click="addTask">Create task</Button>
  </Dialog>
</template>
