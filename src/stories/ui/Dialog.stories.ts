import { ref } from 'vue'
import Dialog from '@/components/ui/Dialog.vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import Button from '@/components/ui/Button.vue'

const meta = {
  title: 'UI/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  argTypes: {
    onOnClose: { action: 'onClose', table: { disable: true } }
  }
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Dialog title',
    open: false,
    default: `This is the content`
  },
  render: (args) => ({
    components: { Dialog, Button },
    setup() {
      const open = ref(args.open)
      return { args, open }
    },
    methods: {
      handleClose() {
        this.open = false
        this.args.onOnClose()
      }
    },
    template: `
      <Button @click="open = true">Open dialog</Button>
      <Dialog :open="open" :title="args.title" @onClose="handleClose">
        {{ args.default }}
      </Dialog>
    `
  })
}
