<script lang="ts" setup></script>

<template>
  <button
    @click="$emit('click')"
    class="rounded-md bg-primary px-4 py-2 font-bold text-background outline-offset-2 outline-background transition ease-linear hover:bg-brand-400/90"
  >
    <slot></slot>
  </button>
</template>
