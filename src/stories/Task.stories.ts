import { fn } from '@storybook/test'
import Task, { type TaskProps } from '@/components/tasks/Task.vue'
import { TaskStatus, type Task as TaskType } from '@/lib/types'
import { mockTask } from '@/components/tasks/taskFixtures'
import type { Meta, StoryObj } from '@storybook/vue3'
import { action } from '@storybook/addon-actions'

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
    task: mockTask()
  }
}

export const InProgress: Story = {
  args: {
    task: mockTask({ status: TaskStatus.IN_PROGRESS })
  }
}

export const Completed: Story = {
  args: {
    task: mockTask({ status: TaskStatus.COMPLETED })
  }
}
