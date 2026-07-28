'use client'

// Modules
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface VerifyEmailContentProps {
  token?: string
  email?: string
}

type VerificationStatus = 'loading' | 'success' | 'error'

const VerifyEmailContent = ({ token, email }: VerifyEmailContentProps) => {
  const [status, setStatus] = useState<VerificationStatus>('loading')
  const [isResending, setIsResending] = useState(false)
  const [isResent, setIsResent] = useState(false)
  const [resendError, setResendError] = useState<string>()

  useEffect(() => {
    let isCancelled = false

    const verifyEmail = async () => {
      if (!token) {
        setStatus('error')
        return
      }

      try {
        // TODO: Send verification token to the auth API.
        await new Promise((resolve) => setTimeout(resolve, 500))

        if (!isCancelled) {
          setStatus('success')
        }
      } catch {
        if (!isCancelled) {
          setStatus('error')
        }
      }
    }

    void verifyEmail()

    return () => {
      isCancelled = true
    }
  }, [token])

  const handleResend = async () => {
    if (!email || isResending) {
      return
    }

    setIsResending(true)
    setIsResent(false)
    setResendError(undefined)

    try {
      // TODO: Resend email verification request.
      await new Promise((resolve) => setTimeout(resolve, 500))

      setStatus('success')
    } catch {
      setResendError('We couldn’t resend the verification email. Please try again.')
    } finally {
      setIsResending(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className='w-full max-w-110 font-afacad' aria-live='polite'>
        <span
          className='mb-6 block size-6 animate-spin rounded-full border-[3px] border-black/20 border-t-black'
          aria-hidden='true'
        />

        <header>
          <p className='mb-2 text-sm font-semibold text-primary'>Email verification</p>

          <h1 className='font-prosto text-[clamp(30px,4vw,38px)] leading-[1.2] text-text-primary'>
            Verifying your email
          </h1>

          <p className='mt-3 text-[17px] leading-6 text-text-secondary'>
            Please wait while we confirm your email address.
          </p>
        </header>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className='w-full max-w-110 font-afacad'>
        <div
          className='mb-6 grid size-14 place-items-center rounded-full bg-primary-subtle text-2xl font-semibold text-primary select-none cursor-default'
          aria-hidden='true'
        >
          ✓
        </div>

        <header className='mb-7'>
          <p className='mb-2 text-sm font-semibold text-primary'>Email verified</p>

          <h1 className='font-prosto text-[clamp(30px,4vw,38px)] leading-[1.2] text-text-primary'>
            Your account is ready
          </h1>

          <p className='mt-3 text-[17px] leading-6 text-text-secondary'>
            Your email address has been confirmed successfully. You can now sign in to Roomly.
          </p>
        </header>

        <Link
          href='/login'
          className='inline-flex min-h-13 w-full items-center justify-center rounded-[10px] border border-[#06b6d4] bg-[#06b6d4] px-5 text-base font-semibold text-white no-underline shadow-[0_4px_12px_rgb(6_182_212/20%)] transition-[background-color,border-color,box-shadow,transform] duration-150 hover:border-[#0891b2] hover:bg-[#0891b2] hover:text-white hover:shadow-[0_6px_18px_rgb(6_182_212/25%)] active:scale-[0.99]'
        >
          Continue to sign in
        </Link>
      </div>
    )
  }

  return (
    <div className='w-full max-w-110 font-afacad'>
      <div
        className='mb-6 grid size-14 place-items-center rounded-full bg-error-light text-2xl font-bold text-error'
        aria-hidden='true'
      >
        !
      </div>

      <header className='mb-7'>
        <p className='mb-2 text-sm font-semibold text-error'>Verification failed</p>

        <h1 className='font-prosto text-[clamp(30px,4vw,38px)] leading-[1.2] text-text-primary'>
          This link is invalid
        </h1>

        <p className='mt-3 text-[17px] leading-6 text-text-secondary'>
          The verification link may be invalid or expired. You can request a new email below.
        </p>
      </header>

      {resendError && (
        <div
          className='mb-5 flex items-start gap-3 rounded-input border border-error/20 bg-error-light px-4 py-3.5 text-[15px] text-error-dark'
          role='alert'
        >
          <span
            className='grid size-5 shrink-0 place-items-center rounded-full bg-error text-xs font-bold text-white'
            aria-hidden='true'
          >
            !
          </span>

          <span>{resendError}</span>
        </div>
      )}

      {isResent && (
        <div
          className='mb-5 rounded-input border border-primary/20 bg-primary-subtle px-4 py-3.5 text-[15px] font-medium text-primary-dark'
          role='status'
        >
          A new verification email has been sent.
        </div>
      )}

      <div className='flex flex-col gap-3'>
        <button
          type='button'
          disabled={!email || isResending}
          onClick={handleResend}
          className='inline-flex min-h-13 w-full cursor-pointer items-center justify-center gap-2.5 rounded-[10px] border border-[#06b6d4] bg-[#06b6d4] px-5 text-base font-semibold text-white shadow-[0_4px_12px_rgb(6_182_212/20%)] transition-[background-color,border-color,box-shadow,transform] duration-150 hover:border-[#0891b2] hover:bg-[#0891b2] hover:text-white active:scale-[0.99] disabled:pointer-events-none disabled:opacity-65'
        >
          {isResending && (
            <span
              className='size-4.25 animate-spin rounded-full border-2 border-white/35 border-t-white'
              aria-hidden='true'
            />
          )}

          <span className='select-none cursor-default'>
            {isResending ? 'Sending...' : 'Resend verification email'}
          </span>
        </button>

        <Link
          href='/login'
          className='inline-flex min-h-13 w-full items-center justify-center rounded-[10px] border border-border-primary bg-white px-5 text-base font-semibold text-text-primary no-underline transition-[border-color,background-color,color] duration-150 hover:border-primary hover:bg-primary-subtle hover:text-primary'
        >
          Back to sign in
        </Link>
      </div>
    </div>
  )
}

export default VerifyEmailContent
