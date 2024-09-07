<script setup lang="ts">
const model = defineModel<string>()
</script>
<template>
  <textarea
    v-model="model"
    class="border-border inline-block w-full rounded border px-3 py-2"
    rows="4"
  />
</template>
