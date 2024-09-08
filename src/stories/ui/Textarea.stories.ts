import { ref } from 'vue'
import Textarea from '@/components/ui/Textarea.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'UI/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      description: 'v-model'
    }
  },
  args: {
    modelValue: 'This Textarea rocks'
  },
  parameters: {}
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Textarea },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: `
      <Textarea v-model="value" />
      <p class="mt-2">Textarea value: {{ value }}</p>
    `
  })
}

export const FormTextarea: Story = {
  render: (args) => ({
    components: { Textarea },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: `
       <div>
        <label for="test" class="text-sm font-semibold leading-none">Title</label>
        <Textarea
          id="test"
          v-model="value"
          placeholder="Integrate PayPal"
          autocomplete="off"
          class="mt-2"
        />
        <span class="text-xs text-red-600">An error ocurred</span>
      </div>
    `
  })
}
