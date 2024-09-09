import Task from '@/components/tasks/Task.vue'
import { mockTask } from '@/components/tasks/taskFixtures'
import { TaskStatus } from '@/lib/types'
import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'Components/Task',
  component: Task,
  tags: ['autodocs'],
  args: {
    task: mockTask(),
    showBadge: true,
    onOnEdit: action('onEdit'),
    onOnRemove: action('onRemove')
  }
} satisfies Meta<typeof Task>

export default meta
type Story = StoryObj<typeof meta>

export const Pending: Story = {
  args: {
    task: mockTask(),
    showBadge: false
  }
}

export const InProgress: Story = {
  args: {
    task: mockTask({ status: TaskStatus.IN_PROGRESS }),
    showBadge: false
  }
}

export const Completed: Story = {
  args: {
    task: mockTask({ status: TaskStatus.COMPLETED }),
    showBadge: false
  }
}
