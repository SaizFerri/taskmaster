<script setup lang="ts">
defineProps<{
  value?: string
}>()
defineEmits<{
  input: [value: string]
}>()
</script>
<template>
  <input
    :value="value"
    @input="$emit('input', ($event.target as HTMLInputElement).value)"
    class="inline-block w-full rounded border border-border px-3 py-2"
  />
</template>
