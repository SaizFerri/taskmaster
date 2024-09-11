import AddTaskDialog from '@/components/tasks/AddTaskDialog.vue'
import Button from '@/components/ui/Button.vue'
import { TaskStatus, type CreateTask } from '@/lib/types'
import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { userEvent, waitFor, within, expect, fn, screen } from '@storybook/test'
import { addDays, format, formatDate, startOfDay } from 'date-fns'

const meta = {
  title: 'Components/AddTaskDialog',
  component: AddTaskDialog,
  tags: ['autodocs'],
  argTypes: {
    onOnClose: { action: 'onClose', table: { disable: true } },
    onOnAddTask: { action: 'onAddTask', table: { disable: true } }
  },
  args: {
    open: true
  },
  parameters: {
    test: {
      // Otherwise re-running breaks due to the vue devtools
      dangerouslyIgnoreUnhandledErrors: true
    }
  }
} satisfies Meta<typeof AddTaskDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    open: false,
    onOnAddTask: fn()
  },
  render: (args) => ({
    components: { AddTaskDialog, Button },
    setup() {
      const open = ref(args.open)
      return { args, open }
    },
    methods: {
      handleSubmit(data: CreateTask) {
        this.open = false
        this.args.onOnAddTask(data)
      },
      handleClose() {
        this.open = false
        this.args.onOnClose()
      }
    },
    template: `
      <Button @click="open = true">Add task</Button>
      <AddTaskDialog :open="open" @onClose="handleClose" @onAddTask="handleSubmit">
        {{ args.default }}
      </AddTaskDialog>
    `
  })
}

Default.play = async ({ args, canvasElement, step }) => {
  const canvas = within(canvasElement)
  const dueDate = startOfDay(addDays(new Date(), 1))

  await step('Open dialog', async () => {
    await userEvent.click(canvas.getByRole('button', { name: 'Add task' }))
    expect(screen.getByText('Add new task')).toBeInTheDocument()
  })

  await step('Fill out form', async () => {
    await userEvent.type(screen.getByLabelText('Title'), 'Test')
    await userEvent.type(screen.getByLabelText('Description'), 'This is a test')
    await userEvent.type(screen.getByLabelText('Due date'), format(dueDate, 'yyyy-MM-dd'))
  })

  await step('Submit', async () => {
    await userEvent.click(screen.getByRole('button', { name: 'Create' }))
    expect(screen.queryByText('Add new task')).not.toBeInTheDocument()
  })

  await waitFor(() =>
    expect(args.onOnAddTask).toHaveBeenCalledWith({
      title: 'Test',
      description: 'This is a test',
      dueDate: formatDate(dueDate, `yyyy-MM-dd'T'HH:mm:ss.SSS'Z'`, { weekStartsOn: 1 }),
      status: TaskStatus.PENDING
    })
  )
}
