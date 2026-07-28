// Types
import type { ChangeEventHandler } from 'react'

export interface LoginValues {
  email: string
  password: string
  remember: boolean
}

export interface LoginErrors {
  email?: string
  password?: string
  form?: string
}

export interface LoginFieldsProps {
  values: LoginValues
  errors: Pick<LoginErrors, 'email' | 'password'>
  isPasswordVisible: boolean
  onChange: ChangeEventHandler<HTMLInputElement>
  onPasswordVisibilityToggle: () => void
}
