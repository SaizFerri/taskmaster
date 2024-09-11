import Task from '@/components/tasks/Task.vue'
import { mockTask } from '@/components/tasks/taskFixtures'
import { TaskStatus } from '@/lib/types'
import type { Meta, StoryObj } from '@storybook/vue3'
import { subDays } from 'date-fns'

const meta = {
  title: 'Components/Task',
  component: Task,
  tags: ['autodocs'],
  argTypes: {
    task: {
      table: { type: { summary: 'Task' } }
    },
    onOnEdit: { action: 'onEdit', table: { disable: true } },
    onOnRemove: { action: 'onRemove', table: { disable: true } }
  },
  args: {
    task: mockTask(),
    showBadge: true
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

export const Overdue: Story = {
  args: {
    task: mockTask({
      status: TaskStatus.PENDING,
      dueDate: subDays(new Date(), 1).toISOString()
    }),
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
