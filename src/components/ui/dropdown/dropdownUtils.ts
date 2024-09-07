import type { Ref } from 'vue'

export const DROPDOWN = Symbol()

export type DropdownContext = {
  open: Ref<boolean>
  close: () => void
  toggle: () => void
}
