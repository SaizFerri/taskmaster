<script lang="ts" setup>
import { X } from 'lucide-vue-next'
import { onBeforeUnmount, onMounted, ref, Teleport, useTemplateRef, watchEffect } from 'vue'

type Props = {
  open: boolean
  title: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'onClose', open: boolean): void
}>()

const isVisible = ref(props.open)
const closeBtn = useTemplateRef<HTMLElement | null>('closeBtn')
const dialogContent = ref<HTMLElement | null>(null)
const previousActiveElement = ref<Element | null>(null)

const close = () => {
  isVisible.value = false
  emit('onClose', false)
}

const trapFocus = (e: KeyboardEvent) => {
  if (e.key !== 'Tab' || !dialogContent.value) return

  const focusableElements = dialogContent.value.querySelectorAll<HTMLElement>(
    'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
  )

  if (focusableElements.length === 0) return

  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  if (e.shiftKey && document.activeElement === firstElement) {
    lastElement.focus()
    e.preventDefault()
  } else if (!e.shiftKey && document.activeElement === lastElement) {
    firstElement.focus()
    e.preventDefault()
  }
}

onMounted(() => {
  if (props.open) {
    previousActiveElement.value = document.activeElement
    closeBtn.value?.focus()
    document.addEventListener('keydown', trapFocus)
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', trapFocus)
  if (previousActiveElement.value instanceof HTMLElement) {
    previousActiveElement.value.focus()
  }
})

watchEffect(() => {
  if (props.open) {
    isVisible.value = true
    previousActiveElement.value = document.activeElement

    closeBtn.value?.focus()
    document.addEventListener('keydown', trapFocus)
  } else {
    document.removeEventListener('keydown', trapFocus)
    if (previousActiveElement.value instanceof HTMLElement) {
      previousActiveElement.value.focus()
    }
    isVisible.value = false
  }
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isVisible"
      class="fixed left-0 top-0 flex h-screen w-full items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      @keydown.esc="close"
      @click.self="close"
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
        <h1 id="dialog-title" class="mb-3 text-lg font-bold">{{ title }}</h1>
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>
