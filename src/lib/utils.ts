import type { FormFields } from './types'
import clsx, { type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateRandomId() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let randomId = ''

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    randomId += characters[randomIndex]
  }

  return randomId
}

export function formToOutput<Output>(form: FormFields<Output>): Output {
  const output: Record<string, unknown> = {}

  for (const key in form) {
    if (Object.prototype.hasOwnProperty.call(form, key)) {
      output[key] = form[key].value
    }
  }

  return output as Output
}
