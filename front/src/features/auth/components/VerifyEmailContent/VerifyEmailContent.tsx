'use client'

// Components
import ResendVerification from './ResendVerification'
import VerificationCodeForm from './VerificationCodeForm'
import VerificationSuccess from './VerificationSuccess'

// Hooks
import useVerifyEmail from '../../hooks/useVerifyEmail'

// Types
import type { VerifyEmailContentProps } from '../../types/verification.types'

const VerifyEmailContent = ({ email }: VerifyEmailContentProps) => {
  const {
    code,
    status,
    error,
    isSubmitting,
    isResending,
    isResent,
    handleCodeChange,
    handleSubmit,
    resendVerificationEmail,
  } = useVerifyEmail()

  if (status === 'success') {
    return <VerificationSuccess email={email} />
  }

  return (
    <div className='w-full font-afacad'>
      <header>
        <p className='mb-2 text-sm font-semibold text-primary'>Email verification</p>

        <h1 className='m-0 font-prosto text-[clamp(30px,4vw,38px)] font-normal leading-[1.2] text-text-primary'>
          Enter verification code
        </h1>

        <p className='mt-3 text-[17px] leading-6 text-text-secondary'>
          We sent a 6-digit code
          {email ? (
            <>
              {' '}
              to <span className='font-semibold text-text-primary'>{email}</span>
            </>
          ) : (
            ' to your email address'
          )}
          .
        </p>
      </header>

      <VerificationCodeForm
        code={code}
        error={error}
        isSubmitting={isSubmitting}
        onChange={handleCodeChange}
        onSubmit={handleSubmit}
      />

      <ResendVerification
        isResending={isResending}
        isResent={isResent}
        onResend={() => void resendVerificationEmail()}
      />
    </div>
  )
}

export default VerifyEmailContent
