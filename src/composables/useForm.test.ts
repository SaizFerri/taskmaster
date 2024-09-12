import { useForm } from '@/composables/useForm'
import { describe, expect, it, vi } from 'vitest'
import { z } from 'zod'

const TestSchema = z.object({
  name: z.string().min(3),
  email: z.string().email()
})

const emptyState = {
  name: {
    value: '',
    error: ''
  },
  email: {
    value: '',
    error: ''
  }
}

describe('useForm', () => {
  it('returns the correct initial form shape', () => {
    const { form } = useForm(TestSchema)

    expect(form).toStrictEqual(emptyState)
  })

  it('returns the correct intial form shape with default values', () => {
    const { form } = useForm(TestSchema, { defaultValues: { name: 'Test' } })

    expect(form).toStrictEqual({
      name: {
        value: 'Test',
        error: ''
      },
      email: {
        value: '',
        error: ''
      }
    })
  })

  it('handles submit', () => {
    const { form, handleSubmit } = useForm(TestSchema, {
      defaultValues: { name: 'Test', email: 'test@test.com' }
    })

    const onSubmit = vi.fn()

    handleSubmit(onSubmit)()

    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Test',
      email: 'test@test.com'
    })
  })

  it('handles submit with errors', () => {
    const { form, handleSubmit } = useForm(TestSchema, {
      defaultValues: { name: 'Test', email: 'test' }
    })

    const onSubmit = vi.fn()

    handleSubmit(onSubmit)()

    expect(onSubmit).not.toHaveBeenCalled()
    expect(form).toStrictEqual({
      name: {
        value: 'Test',
        error: ''
      },
      email: {
        value: 'test',
        error: 'Invalid email'
      }
    })
  })

  it('updates a value by name', () => {
    const { form, update } = useForm(TestSchema, {
      defaultValues: { name: 'Test', email: 'test@test.com' }
    })

    update('name', 'Changed')

    expect(form).toStrictEqual({
      name: {
        value: 'Changed',
        error: ''
      },
      email: {
        value: 'test@test.com',
        error: ''
      }
    })
  })

  it('resets the values', () => {
    const { form, reset } = useForm(TestSchema, {
      defaultValues: { name: 'Test', email: 'test' }
    })

    reset()

    expect(form).toStrictEqual(emptyState)
  })

  it('clears all the errors', () => {
    const { form, handleSubmit, clearErrors } = useForm(TestSchema, {
      defaultValues: { name: 'Test', email: 'test' }
    })

    const onSubmit = vi.fn()

    handleSubmit(onSubmit)()

    expect(form).toStrictEqual({
      name: {
        value: 'Test',
        error: ''
      },
      email: {
        value: 'test',
        error: 'Invalid email'
      }
    })

    clearErrors()

    expect(form).toStrictEqual({
      name: {
        value: 'Test',
        error: ''
      },
      email: {
        value: 'test',
        error: ''
      }
    })
  })
})
