'use client'

// Modules
import Link from 'next/link'
import { useState } from 'react'

interface CheckEmailContentProps {
  email?: string
}

const CheckEmailContent = ({ email }: CheckEmailContentProps) => {
  const [isResending, setIsResending] = useState(false)
  const [isResent, setIsResent] = useState(false)
  const [error, setError] = useState<string>()

  const handleResend = async () => {
    if (!email || isResending) {
      return
    }

    setIsResending(true)
    setIsResent(false)
    setError(undefined)

    try {
      // TODO: Resend password reset email.
      await new Promise((resolve) => setTimeout(resolve, 600))

      setIsResent(true)
    } catch {
      setError('We couldn’t resend the email. Please try again.')
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className='w-full max-w-110 font-afacad'>
      <div
        className='mb-6 grid size-14 place-items-center rounded-full bg-primary-subtle text-2xl font-semibold text-primary select-none'
        aria-hidden='true'
      >
        ✓
      </div>

      <header className='mb-7'>
        <p className='mb-2 text-sm font-semibold text-primary'>Check your inbox</p>

        <h1 className='font-prosto text-[clamp(30px,4vw,38px)] leading-[1.2] text-text-primary'>
          Reset link sent
        </h1>

        <p className='mt-3 text-[17px] leading-6 text-text-secondary'>
          We sent password reset instructions
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

      <div className='rounded-input border border-border-primary bg-white px-4 py-4 text-[15px] leading-6 text-text-secondary shadow-[0_1px_2px_rgb(33_39_50/4%)]'>
        The email may take a minute to arrive. Check your spam folder if you do not see it.
      </div>

      {error && (
        <div
          className='mt-5 flex items-start gap-3 rounded-input border border-error/20 bg-error-light px-4 py-3.5 text-[15px] text-error-dark'
          role='alert'
        >
          <span
            className='grid size-5 shrink-0 place-items-center rounded-full bg-error text-xs font-bold text-white'
            aria-hidden='true'
          >
            !
          </span>

          <span>{error}</span>
        </div>
      )}

      {isResent && (
        <div
          className='mt-5 rounded-input border border-primary/20 bg-primary-subtle px-4 py-3.5 text-[15px] font-medium text-primary-dark'
          role='status'
        >
          A new reset link has been sent.
        </div>
      )}

      <div className='mt-5 flex flex-col gap-3'>
        <button
          type='button'
          disabled={!email || isResending}
          onClick={handleResend}
          className='inline-flex min-h-13 w-full cursor-pointer items-center justify-center gap-2.5 rounded-[10px] border border-[#06b6d4] bg-[#06b6d4] px-5 text-base font-semibold text-white shadow-[0_4px_12px_rgb(6_182_212/20%)] transition-[background-color,border-color,box-shadow,transform] duration-150 hover:border-[#0891b2] hover:bg-[#0891b2] hover:shadow-[0_6px_18px_rgb(6_182_212/25%)] active:scale-[0.99] disabled:pointer-events-none disabled:opacity-65'
        >
          {isResending && (
            <span
              className='size-4.25 animate-spin rounded-full border-2 border-white/35 border-t-white'
              aria-hidden='true'
            />
          )}

          <span>{isResending ? 'Resending...' : 'Resend email'}</span>
        </button>

        <Link
          href='/forgot-password'
          className='inline-flex min-h-13 w-full items-center justify-center rounded-[10px] border border-border-primary bg-white px-5 text-base font-semibold text-text-primary no-underline transition-[border-color,background-color,color] duration-150 hover:border-primary hover:bg-primary-subtle hover:text-primary'
        >
          Use another email
        </Link>
      </div>

      <p className='mt-7 text-center text-base text-text-secondary'>
        Remembered your password?{' '}
        <Link href='/login' className='font-semibold text-secondary no-underline hover:underline'>
          Back to sign in
        </Link>
      </p>
    </div>
  )
}

export default CheckEmailContent
