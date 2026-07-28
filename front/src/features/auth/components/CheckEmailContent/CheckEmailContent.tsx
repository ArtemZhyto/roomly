'use client'

// Modules
import Link from 'next/link'

// Components
import CheckEmailActions from './CheckEmailActions'
import CheckEmailNotice from './CheckEmailNotice'

// Hooks
import useResendResetEmail from '../../hooks/useResendResetEmail'

// Types
import type { CheckEmailContentProps } from '../../types/verification.types'

// Styles
import styles from './CheckEmailContent.module.scss'

const CheckEmailContent = ({ email }: CheckEmailContentProps) => {
  const { isResending, isResent, error, resendEmail } = useResendResetEmail(email)

  return (
    <div className='w-full font-afacad'>
      <div className={styles.statusIcon} aria-hidden='true'>
        ✓
      </div>

      <header className='mb-7'>
        <p className='mb-2 text-sm font-semibold text-primary'>Check your inbox</p>

        <h1 className='m-0 font-prosto text-[clamp(30px,4vw,38px)] font-normal leading-[1.2] text-text-primary'>
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

      <CheckEmailNotice error={error} isResent={isResent} />

      <CheckEmailActions email={email} isResending={isResending} onResend={resendEmail} />

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
