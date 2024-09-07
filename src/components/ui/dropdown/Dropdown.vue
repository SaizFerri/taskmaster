<script setup lang="ts">
import { provide, ref } from 'vue'
import { DROPDOWN, type DropdownContext } from './dropdownUtils'

const open = ref(false)

function close() {
  open.value = false
}

function toggle() {
  open.value = !open.value
}

provide<DropdownContext>(DROPDOWN, {
  open,
  close,
  toggle
})
</script>
<template>
  <div class="relative inline-block" @keydown.esc="close">
    <slot></slot>
  </div>
</template>
