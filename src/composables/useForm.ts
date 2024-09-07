import type { FormFields } from '@/lib/types'
import { formToOutput } from '@/lib/utils'
import { reactive, unref } from 'vue'
import { z } from 'zod'

export type UseForm<T> = {
  defaultValues?: Partial<T>
  schema: z.ZodObject<any>
}

export function useForm<T>({ defaultValues = {}, schema }: UseForm<T>) {
  const form = reactive(createFormFields()) as FormFields<T>

  function createFormFields() {
    const output: Partial<FormFields<T>> = {}

    for (const key in schema.shape) {
      if (Object.prototype.hasOwnProperty.call(schema.shape, key)) {
        const defaultValue = defaultValues[key as keyof T] as string
        output[key as keyof T] = createFormField(defaultValue ?? '')
      }
    }

    return output as FormFields<T>
  }

  function handleSubmit(fn: (data: T) => void) {
    return () => {
      clearErrors()
      const isValid = validate()

      if (!isValid) {
        return
      }

      fn(formToOutput(unref(form)))
    }
  }

  function validate() {
    const output = formToOutput<FormFields<T>>(unref(form))

    const validationResult = schema.safeParse(output)

    if (!validationResult.success) {
      const error = validationResult.error

      error.issues.forEach(({ message, path }) => {
        let valueToUpdate: any = form
        path.forEach((v) => {
          valueToUpdate = valueToUpdate[v as keyof T]
        })
        valueToUpdate.error = message
      })

      return false
    }

    return true
  }

  function clearErrors() {
    for (const key in form) {
      if (Object.prototype.hasOwnProperty.call(form, key)) {
        form[key as keyof T].error = ''
      }
    }
  }

  function reset() {
    for (const key in form) {
      form[key as keyof T].value = ''
    }
  }

  return {
    form,
    handleSubmit,
    reset,
    clearErrors
  }
}

function createFormField<T>(defaultValue: string = '') {
  return {
    value: defaultValue,
    error: ''
  }
}
