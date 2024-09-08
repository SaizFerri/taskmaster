import { ref } from 'vue'
import Input from '@/components/ui/Input.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      description: 'v-model'
    }
  },
  args: {
    modelValue: 'This input rocks'
  },
  parameters: {}
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: `
      <Input v-model="value" />
      <p class="mt-2">Input value: {{ value }}</p>
    `
  })
}

export const FormInput: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: `
       <div>
        <label for="test" class="text-sm font-semibold leading-none">Title</label>
        <Input
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
