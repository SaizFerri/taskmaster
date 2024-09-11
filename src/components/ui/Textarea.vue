<script setup lang="ts">
defineProps<{
  value?: string
}>()
defineEmits<{
  input: [value: string]
}>()
</script>
<template>
  <textarea
    :value="value"
    class="inline-block w-full rounded border border-border px-3 py-2"
    rows="4"
    @input="$emit('input', ($event.target as HTMLTextAreaElement).value)"
  />
</template>
