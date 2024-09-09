<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import { Notebook } from 'lucide-vue-next'
</script>

<template>
  <header class="fixed flex h-[72px] w-full items-center bg-white px-4">
    <div class="container mx-auto">
      <div class="flex items-center justify-between">
        <h1 class="flex items-center gap-1">
          <Notebook aria-hidden />
          <span class="text-2xl font-bold">TaskMaster</span>
        </h1>
        <Button>Log in</Button>
      </div>
    </div>
  </header>
</template>
