<script setup lang="ts"></script>
<template>
  <li role="menuitem" class="min-w-[100px] text-sm">
    <button class="w-full p-1 text-left transition hover:bg-gray-100" v-bind="$attrs">
      <slot></slot>
    </button>
  </li>
</template>
