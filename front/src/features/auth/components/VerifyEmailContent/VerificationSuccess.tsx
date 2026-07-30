// Components
import { AuthActionLink } from '../AuthSubmitButton'

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

      <AuthActionLink href='/rooms' label='Continue to Roomly' />
    </div>
  )
}

export default VerificationSuccess
