<script setup lang="ts">
import Header from '@/components/Header.vue'
import { useTaskStoreSubscribers } from '@/stores/tasks'
import { RouterView } from 'vue-router'

useTaskStoreSubscribers()
</script>

<template>
  <Header />
  <RouterView />
</template>
