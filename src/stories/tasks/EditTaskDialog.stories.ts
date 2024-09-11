import EditTaskDialog from '@/components/tasks/EditTaskDialog.vue'
import { mockTask } from '@/components/tasks/taskFixtures'
import Button from '@/components/ui/Button.vue'
import { TaskStatus, type EditTask } from '@/lib/types'
import { expect, fn, screen, userEvent, waitFor, within } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/vue3'
import { addDays, format, formatDate, startOfDay } from 'date-fns'
import { ref } from 'vue'

const meta = {
  title: 'Components/EditTaskDialog',
  component: EditTaskDialog,
  tags: ['autodocs'],
  argTypes: {
    onOnClose: { action: 'onClose', table: { disable: true } },
    onOnEditTask: { action: 'onEditTask', table: { disable: true } }
  },
  args: {
    open: true,
    task: mockTask()
  },
  parameters: {
    test: {
      // Otherwise re-running breaks due to the vue devtools
      dangerouslyIgnoreUnhandledErrors: true
    }
  }
} satisfies Meta<typeof EditTaskDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    open: false,
    task: mockTask(),
    onOnEditTask: fn()
  },
  render: (args) => ({
    components: { EditTaskDialog, Button },
    setup() {
      const open = ref(args.open)
      return { args, open }
    },
    methods: {
      handleSubmit(data: EditTask) {
        this.open = false
        this.args.onOnEditTask(data)
      },
      handleClose() {
        this.open = false
        this.args.onOnClose()
      }
    },
    template: `
      <Button @click="open = true">Edit task</Button>
      <EditTaskDialog :open="open" :task="args.task" @onClose="handleClose" @onEditTask="handleSubmit">
        {{ args.default }}
      </EditTaskDialog>
    `
  })
}

Default.play = async ({ args, canvasElement, step }) => {
  const canvas = within(canvasElement)
  const dueDate = startOfDay(addDays(new Date(), 1))

  await step('Open dialog', async () => {
    await userEvent.click(canvas.getByRole('button', { name: 'Edit task' }))
    expect(screen.getByLabelText('Status')).toBeInTheDocument()
  })

  await step('Fill out form', async () => {
    await userEvent.selectOptions(screen.getByLabelText('Status'), TaskStatus.COMPLETED)
    await userEvent.clear(screen.getByLabelText('Due date'))
    await userEvent.type(screen.getByLabelText('Due date'), format(dueDate, 'yyyy-MM-dd'))
  })

  await step('Submit', async () => {
    await userEvent.click(screen.getByRole('button', { name: 'Save' }))
    expect(screen.queryByLabelText('Status')).not.toBeInTheDocument()
  })

  await waitFor(() =>
    expect(args.onOnEditTask).toHaveBeenCalledWith({
      title: 'Complete project documentation',
      description: 'Write detailed documentation for the new project features.',
      dueDate: formatDate(dueDate, `yyyy-MM-dd'T'HH:mm:ss.SSS'Z'`, { weekStartsOn: 1 }),
      status: TaskStatus.COMPLETED
    })
  )
}
