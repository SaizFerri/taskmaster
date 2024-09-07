<script setup lang="ts">
import { inject, type Component } from 'vue'
import { DROPDOWN, type DropdownContext } from './dropdownUtils'
import Button from '../Button.vue'

withDefaults(
  defineProps<{
    as?: Component | string
  }>(),
  { as: Button }
)
const { toggle, open } = inject<DropdownContext>(DROPDOWN) ?? {}
</script>
<template>
  <component
    :is="as"
    @click="toggle"
    :aria-expanded="open ? 'true' : 'false'"
    aria-haspopup="true"
    ref="dropdownTrigger"
  >
    <slot></slot
  ></component>
</template>
