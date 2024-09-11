import TaskListControls from '@/components/tasks/TaskListControls.vue'
import { TaskStatus } from '@/lib/types'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'Components/TaskListControls',
  component: TaskListControls,
  tags: ['autodocs'],
  argTypes: {
    sort: {
      table: { type: { summary: 'Sort' } },
      control: { type: 'select' },
      options: ['asc', 'desc']
    },
    status: {
      table: { type: { summary: 'TaskStatus' } },
      control: { type: 'select' },
      options: ['', TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED]
    },
    onOnStatusChange: { action: 'onStatusChange', table: { disable: true } },
    onOnSortChange: { action: 'onSortChange', table: { disable: true } },
    onOnAddTask: { action: 'onAddTask', table: { disable: true } }
  },
  args: {
    sort: 'asc',
    status: TaskStatus.PENDING
  }
} satisfies Meta<typeof TaskListControls>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}
