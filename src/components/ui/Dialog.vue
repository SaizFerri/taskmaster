<script lang="ts" setup>
import { UseFocusTrap } from '@vueuse/integrations/useFocusTrap/component'
import { X } from 'lucide-vue-next'
import { ref, useTemplateRef, watchEffect } from 'vue'

type Props = {
  open: boolean
  title: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  onClose: [open: boolean]
}>()

const isVisible = ref(props.open)
const closeBtn = useTemplateRef<HTMLElement | null>('closeBtn')
const dialogContent = ref<HTMLElement | null>(null)

const close = () => {
  isVisible.value = false
  emit('onClose', false)
}

watchEffect(() => {
  isVisible.value = props.open
  if (props.open) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'initial'
  }
})
</script>

<template>
  <Teleport to="body">
    <UseFocusTrap v-if="isVisible" :options="{ immediate: true, allowOutsideClick: true }">
      <div
        class="pointer-events-[all] fixed left-0 top-0 z-30 flex h-screen w-full animate-fade items-center justify-center bg-black/50"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        @keydown.esc="close"
      >
        <div
          class="relative w-full max-w-[500px] rounded-md bg-white p-5"
          ref="dialogContent"
          tabindex="-1"
        >
          <button
            class="absolute right-3 top-3 cursor-pointer"
            ref="closeBtn"
            @click="close"
            aria-label="Close dialog"
          >
            <X :size="16" />
          </button>
          <h2 id="dialog-title" class="mb-3 text-lg font-bold">{{ title }}</h2>
          <slot></slot>
        </div>
      </div>
    </UseFocusTrap>
  </Teleport>
</template>
