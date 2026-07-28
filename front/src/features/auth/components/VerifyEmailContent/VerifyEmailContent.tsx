'use client'

// Components
import VerificationError from './VerificationError'
import VerificationLoading from './VerificationLoading'
import VerificationSuccess from './VerificationSuccess'

// Hooks
import useVerifyEmail from '../../hooks/useVerifyEmail'

// Types
import type { VerifyEmailContentProps } from '../../types/verification.types'

const VerifyEmailContent = ({ token, email }: VerifyEmailContentProps) => {
  const { status, error, isResending, isResent, resendVerificationEmail } = useVerifyEmail(
    token,
    email,
  )

  if (status === 'loading') {
    return <VerificationLoading />
  }

  if (status === 'success') {
    return <VerificationSuccess email={email} />
  }

  return (
    <VerificationError
      email={email}
      error={error ?? 'Unknown verification error.'}
      isResending={isResending}
      isResent={isResent}
      onResend={resendVerificationEmail}
    />
  )
}

export default VerifyEmailContent
