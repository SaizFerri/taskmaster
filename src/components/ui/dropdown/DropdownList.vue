<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { UseFocusTrap } from '@vueuse/integrations/useFocusTrap/component'
import { inject, ref } from 'vue'
import { DROPDOWN, type DropdownContext } from './dropdownUtils'

const { open, close } = inject<DropdownContext>(DROPDOWN) as DropdownContext

const el = ref(null)

onClickOutside(el, () => close())
</script>
<template>
  <UseFocusTrap v-if="open" :options="{ immediate: true, allowOutsideClick: true }">
    <ul
      ref="el"
      role="menu"
      class="border-border z-1 absolute right-0 top-[calc(100%+4px)] flex flex-col rounded-md border bg-white p-1 shadow"
    >
      <slot></slot>
    </ul>
  </UseFocusTrap>
</template>
