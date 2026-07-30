// Types
import type { ChangeEvent, FormEvent } from 'react'

export type VerificationStatus = 'idle' | 'success'

export interface VerifyEmailContentProps {
  email?: string
}

export interface VerificationCodeFormProps {
  code: string
  error?: string
  isSubmitting: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export interface VerificationSuccessProps {
  email?: string
}

export interface ResendVerificationProps {
  isResending: boolean
  isResent: boolean
  onResend: () => void
}

export interface CheckEmailActionsProps {
  email?: string
  isResending: boolean
  onResend: () => void
}

export interface CheckEmailContentProps {
  email?: string
}
