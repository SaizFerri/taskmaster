import { ref } from 'vue'
import Input from '@/components/ui/Input.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    value: 'This input rocks'
  },
  parameters: {}
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref(args.value)
      return { args, value }
    },
    template: `
      <Input :value="value" @input="(val) => value = val" />
      <p class="mt-2">Input value: {{ value }}</p>
    `
  })
}

export const FormInput: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref(args.value)
      return { args, value }
    },
    template: `
       <div>
        <label for="test" class="text-sm font-semibold leading-none">Title</label>
        <Input
          id="test"
          :value="value"
          placeholder="Integrate PayPal"
          autocomplete="off"
          class="mt-2"
          @input="(val) => value = val"
        />
        <span class="text-xs text-red-600">An error ocurred</span>
      </div>
    `
  })
}
