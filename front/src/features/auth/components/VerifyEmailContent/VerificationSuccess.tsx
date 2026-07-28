// Modules
import Link from 'next/link'

// Types
import type { VerificationSuccessProps } from '../../types/verification.types'

// Styles
import styles from './VerifyEmailContent.module.scss'

const VerificationSuccess = ({ email }: VerificationSuccessProps) => {
  return (
    <div className='w-full font-afacad' role='status' aria-live='polite'>
      <div className={`${styles.statusIcon} ${styles.successIcon}`} aria-hidden='true'>
        ✓
      </div>

      <header className='mb-7'>
        <p className='mb-2 text-sm font-semibold text-success'>Email verified</p>

        <h1 className='m-0 font-prosto text-[clamp(30px,4vw,38px)] font-normal leading-[1.2] text-text-primary'>
          Your account is ready
        </h1>

        <p className='mt-3 text-[17px] leading-6 text-text-secondary'>
          {email ? (
            <>
              <span className='font-semibold text-text-primary'>{email}</span> has been verified
              successfully.
            </>
          ) : (
            'Your email address has been verified successfully.'
          )}
        </p>
      </header>

      <Link
        href='/login'
        className='inline-flex min-h-13 w-full items-center justify-center rounded-[10px] bg-primary px-5 text-base font-semibold text-white no-underline shadow-button transition-[background-color,box-shadow,transform] duration-150 hover:bg-primary-hover hover:shadow-[0_6px_18px_rgb(6_182_212/25%)] active:scale-[0.99]'
      >
        Continue to sign in
      </Link>
    </div>
  )
}

export default VerificationSuccess
