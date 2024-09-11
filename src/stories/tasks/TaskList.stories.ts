import TaskList from '@/components/tasks/TaskList.vue'
import { mockTask } from '@/components/tasks/taskFixtures'
import { TaskStatus } from '@/lib/types'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'Components/TaskList',
  component: TaskList,
  tags: ['autodocs'],
  argTypes: {
    tasks: {
      table: { type: { summary: 'Task[]' } }
    },
    onOnAddTask: { action: 'onAddTask', table: { disable: true } },
    onOnEditTask: { action: 'onEditTask', table: { disable: true } },
    onOnRemoveTask: { action: 'onRemoveTask', table: { disable: true } }
  }
} satisfies Meta<typeof TaskList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    tasks: [mockTask()]
  }
}

export const AllStatus: Story = {
  args: {
    tasks: [
      mockTask(),
      mockTask({ status: TaskStatus.IN_PROGRESS, title: 'This task is in progress' }),
      mockTask({ status: TaskStatus.COMPLETED, title: 'This task is completed' })
    ]
  }
}
