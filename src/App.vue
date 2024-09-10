<script setup lang="ts">
import Header from '@/components/Header.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div>
    <Header />
    <div class="py-[calc(72px+16px)]">
      <RouterView />
    </div>
  </div>
</template>
