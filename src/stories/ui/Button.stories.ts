import Button, { type ButtonProps } from '@/components/ui/Button.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'destructive', 'secondary'] as ButtonProps['variant'][]
    },
    size: { control: 'select', options: ['default', 'small'] as ButtonProps['size'][] }
  },
  args: {
    default: 'Click me',
    variant: 'primary',
    size: 'default'
  },
  parameters: {
    slots: {
      default: {}
    }
  }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>
export const Primary: Story = {
  args: {
    variant: 'primary'
  }
}

export const Secondary: Story = {
  args: {
    variant: 'secondary'
  }
}

export const Destructive: Story = {
  args: {
    variant: 'destructive'
  }
}
