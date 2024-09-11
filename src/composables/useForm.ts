import type { FormFields } from '@/lib/types'
import { ref } from 'vue'
import { ZodObject } from 'zod'

export interface UseFormOptions<Input> {
  defaultValues?: Partial<Input>
}

export function useForm<Input extends Record<string, any>>(
  schema: ZodObject<any>,
  options: UseFormOptions<Input> = {}
) {
  const defaultValues: Partial<Input> = options.defaultValues || {}

  const formFields = ref<FormFields<Input>>(
    Object.keys(schema.shape).reduce<FormFields<Input>>((acc, key) => {
      acc[key as keyof Input] = {
        value: (defaultValues[key as keyof Input] ?? '') as Input[keyof Input],
        error: ''
      }
      return acc
    }, {} as FormFields<Input>)
  )

  const update = (field: keyof Input, newValue: string) => {
    formFields.value[field].value = newValue
  }

  const reset = (newDefaultValues: Partial<Input> = {}) => {
    Object.keys(formFields.value).forEach((key) => {
      formFields.value[key as keyof Input].value = (newDefaultValues[key as keyof Input] ??
        '') as Input[keyof Input]

      formFields.value[key as keyof Input].error = ''
    })
  }

  const clearErrors = () => {
    Object.keys(formFields.value).forEach((key) => {
      formFields.value[key as keyof Input].error = ''
    })
  }

  const handleSubmit = (callback: (data: Input) => void) => {
    return () => {
      clearErrors()

      const formData = Object.keys(formFields.value).reduce((acc, key) => {
        acc[key as keyof Input] = formFields.value[key as keyof Input].value
        return acc
      }, {} as Input)

      const result = schema.safeParse(formData)

      if (result.success) {
        callback(result.data as Input)
      } else {
        result.error.errors.forEach((err) => {
          const path = err.path[0] as keyof Input
          formFields.value[path].error = err.message
        })
      }
    }
  }

  return {
    form: formFields.value as FormFields<Input>,
    update,
    reset,
    clearErrors,
    handleSubmit
  }
}
