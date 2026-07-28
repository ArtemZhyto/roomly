// Types
import type { ChangeEventHandler } from 'react'

export interface ResetPasswordValues {
  password: string
  confirmPassword: string
}

export interface ResetPasswordErrors {
  password?: string
  confirmPassword?: string
  form?: string
}

export interface ResetPasswordFieldsProps {
  values: ResetPasswordValues
  errors: Pick<ResetPasswordErrors, 'password' | 'confirmPassword'>
  isPasswordVisible: boolean
  isConfirmPasswordVisible: boolean
  onChange: ChangeEventHandler<HTMLInputElement>
  onPasswordVisibilityToggle: () => void
  onConfirmPasswordVisibilityToggle: () => void
}

export interface ResetPasswordFormProps {
  token?: string
}

export interface ResetPasswordSuccessProps {
  onSignIn: () => void
}
