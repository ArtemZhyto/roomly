// Components
import AuthSubmitButton from '../AuthSubmitButton'

// Types
import type { ResendVerificationProps } from '../../types/verification.types'

// Styles
import styles from './VerifyEmailContent.module.scss'

const ResendVerification = ({
  isResending,
  isResent,
  cooldown,
  onResend,
}: ResendVerificationProps) => {
  const label = cooldown > 0 ? `Resend code in ${cooldown}s` : 'Resend code'

  return (
    <div className='mt-5 flex flex-col gap-3'>
      {isResent && (
        <div className={styles.successMessage} role='status' aria-live='polite'>
          A new verification code has been sent.
        </div>
      )}

      <AuthSubmitButton
        type='button'
        label={label}
        loadingLabel='Sending...'
        isLoading={isResending}
        disabled={isResending || cooldown > 0}
        onClick={onResend}
      />
    </div>
  )
}

export default ResendVerification
