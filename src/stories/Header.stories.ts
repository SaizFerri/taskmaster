import Header from '@/components/Header.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs']
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}
