// Modules
import Link from 'next/link'

// Components
import AuthSubmitButton from '../AuthSubmitButton'

// Types
import type { VerificationErrorProps } from '../../types/verification.types'

// Styles
import styles from './VerifyEmailContent.module.scss'

const VerificationError = ({
  email,
  error,
  isResending,
  isResent,
  onResend,
}: VerificationErrorProps) => {
  return (
    <div className='w-full font-afacad'>
      <div className={`${styles.statusIcon} ${styles.errorIcon}`} aria-hidden='true'>
        !
      </div>

      <header className='mb-7'>
        <p className='mb-2 text-sm font-semibold text-error'>Verification failed</p>

        <h1 className='m-0 font-prosto text-[clamp(30px,4vw,38px)] font-normal leading-[1.2] text-text-primary'>
          We couldn’t verify your email
        </h1>

        <p className='mt-3 text-[17px] leading-6 text-text-secondary'>
          The verification link may be invalid or expired.
        </p>
      </header>

      <div className={styles.errorMessage} role='alert'>
        <span className={styles.errorMessageIcon} aria-hidden='true'>
          !
        </span>

        <span>{error}</span>
      </div>

      {isResent && (
        <div className={`${styles.successMessage} mt-4`} role='status'>
          A new verification email has been sent.
        </div>
      )}

      <div className='mt-5 flex flex-col gap-3'>
        <AuthSubmitButton
          type='button'
          label='Resend verification email'
          loadingLabel='Resending...'
          isLoading={isResending}
          disabled={!email}
          onClick={onResend}
        />

        <Link
          href='/register'
          className={`${styles.secondaryLink} inline-flex min-h-13 w-full items-center justify-center rounded-[10px] px-5 text-base font-semibold no-underline`}
        >
          Create another account
        </Link>
      </div>

      {!email && (
        <p className='mt-4 text-center text-sm leading-5 text-text-muted'>
          Return to registration because this link does not contain an email address for resending.
        </p>
      )}
    </div>
  )
}

export default VerificationError
