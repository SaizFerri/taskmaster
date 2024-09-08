import type { FormFields } from '@/lib/types'
import { reactive } from 'vue'
import { ZodObject } from 'zod'

export interface UseFormOptions<Input> {
  defaultValues?: Partial<Input>
}

export function useForm<Input extends Record<string, any>>(
  schema: ZodObject<any>,
  options: UseFormOptions<Input> = {}
) {
  const defaultValues: Partial<Input> = options.defaultValues || {}

  const formFields = reactive(
    Object.keys(schema.shape).reduce((acc, key) => {
      acc[key as keyof Input] = {
        value: (defaultValues[key as keyof Input] ?? '') as Input[keyof Input],
        error: ''
      }
      return acc
    }, {} as FormFields<Input>)
  )

  const reset = (newDefaultValues: Partial<Input> = {}) => {
    Object.keys(formFields).forEach((key) => {
      // @ts-expect-error
      formFields[key as keyof Input].value = (newDefaultValues[key as keyof Input] ??
        '') as Input[keyof Input]
      // @ts-expect-error
      formFields[key as keyof Input].error = ''
    })
  }

  const clearErrors = () => {
    Object.keys(formFields).forEach((key) => {
      // @ts-expect-error
      formFields[key as keyof Input].error = ''
    })
  }

  const handleSubmit = (callback: (data: Input) => void) => {
    return () => {
      clearErrors()

      const formData = Object.keys(formFields).reduce((acc, key) => {
        // @ts-expect-error
        acc[key as keyof Input] = formFields[key as keyof Input].value
        return acc
      }, {} as Input)

      const result = schema.safeParse(formData)

      if (result.success) {
        callback(result.data as Input)
      } else {
        result.error.errors.forEach((err) => {
          const path = err.path[0] as keyof Input
          // @ts-expect-error
          formFields[path].error = err.message
        })
      }
    }
  }

  return {
    form: formFields,
    reset,
    clearErrors,
    handleSubmit
  }
}
