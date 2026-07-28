// Types
import type { ChangeEventHandler } from 'react'

export interface ForgotPasswordValues {
  email: string
}

export interface ForgotPasswordErrors {
  email?: string
  form?: string
}

export interface ForgotPasswordFieldProps {
  value: string
  error?: string
  onChange: ChangeEventHandler<HTMLInputElement>
}
