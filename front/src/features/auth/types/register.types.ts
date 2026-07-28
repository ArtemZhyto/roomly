// Types
import type { ChangeEventHandler } from 'react'

export interface RegisterValues {
  name: string
  email: string
  password: string
  confirmPassword: string
  acceptedTerms: boolean
}

export interface RegisterErrors {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
  acceptedTerms?: string
  form?: string
}

export interface RegisterFieldsProps {
  values: Pick<RegisterValues, 'name' | 'email'>
  errors: Pick<RegisterErrors, 'name' | 'email'>
  onChange: ChangeEventHandler<HTMLInputElement>
}

export interface RegisterPasswordFieldsProps {
  values: Pick<RegisterValues, 'password' | 'confirmPassword'>
  errors: Pick<RegisterErrors, 'password' | 'confirmPassword'>
  isPasswordVisible: boolean
  isConfirmPasswordVisible: boolean
  onChange: ChangeEventHandler<HTMLInputElement>
  onPasswordVisibilityToggle: () => void
  onConfirmPasswordVisibilityToggle: () => void
}

export interface RegisterTermsProps {
  accepted: boolean
  error?: string
  onChange: ChangeEventHandler<HTMLInputElement>
}
