export type VerificationStatus = 'loading' | 'success' | 'error'

export interface VerifyEmailContentProps {
  token?: string
  email?: string
}

export interface CheckEmailContentProps {
  email?: string
}

export interface CheckEmailActionsProps {
  email?: string
  isResending: boolean
  onResend: () => void
}

export interface VerificationErrorProps {
  email?: string
  error: string
  isResending: boolean
  isResent: boolean
  onResend: () => void
}

export interface VerificationSuccessProps {
  email?: string
}
