import Badge, { type BadgeProps } from '@/components/ui/Badge.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'info', 'success'] as BadgeProps['variant'][]
    }
  },
  args: {
    default: 'Badge',
    variant: 'default'
  },
  parameters: {
    slots: {
      default: {
        description: 'Content'
      }
    }
  }
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'default'
  }
}

export const Info: Story = {
  args: {
    variant: 'info'
  }
}

export const Success: Story = {
  args: {
    variant: 'success'
  }
}
