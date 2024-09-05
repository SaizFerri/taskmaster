<script setup lang="ts">
import Task from '@/components/Task.vue'
import Button from '@/components/ui/Button.vue'
import Dialog from '@/components/ui/Dialog.vue'
import { tasks } from '@/lib/const'
import { ref } from 'vue'

const showModal = ref(false)
</script>

<template>
  <main class="space-y-4 p-8">
    <Button @click="showModal = true">Save</Button>
    <div v-for="task in tasks">
      <Task v-bind="task" />
    </div>
  </main>
  <Dialog :open="showModal" @update:open="showModal = false" title="My Modal">
    <p>This is some modal content.</p>
  </Dialog>
</template>
