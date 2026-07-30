// Components
import AuthSubmitButton from '../AuthSubmitButton'

// Types
import type { ResendVerificationProps } from '../../types/verification.types'

// Styles
import styles from './VerifyEmailContent.module.scss'

const ResendVerification = ({ isResending, isResent, onResend }: ResendVerificationProps) => {
  return (
    <div className='mt-5 flex flex-col gap-3'>
      {isResent && (
        <div className={styles.successMessage} role='status'>
          A new verification code has been sent.
        </div>
      )}

      <AuthSubmitButton
        type='button'
        label='Resend code'
        loadingLabel='Sending...'
        isLoading={isResending}
        onClick={onResend}
      />
    </div>
  )
}

export default ResendVerification
