import type { FormFields } from '@/lib/types'
import { formToOutput } from '@/lib/utils'
import { describe, expect, it, vi } from 'vitest'

describe('utils', () => {
  describe('formToOutput', () => {
    it('returns the correct object from form fields', () => {
      const formFields: FormFields<{ email: string }> = {
        email: {
          value: 'test@test.com',
          error: ''
        }
      }

      expect(formToOutput(formFields)).toStrictEqual({
        email: 'test@test.com'
      })
    })
  })
})
