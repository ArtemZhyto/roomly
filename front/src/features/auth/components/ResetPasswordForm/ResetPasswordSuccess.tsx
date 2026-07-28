// Types
import type { ResetPasswordSuccessProps } from '../../types/resetPassword.types'

// Styles
import styles from './ResetPasswordForm.module.scss'

const ResetPasswordSuccess = ({ onSignIn }: ResetPasswordSuccessProps) => {
  return (
    <div className='w-full font-afacad' role='status' aria-live='polite'>
      <div className={styles.successIcon} aria-hidden='true'>
        ✓
      </div>

      <header className='mb-7'>
        <p className='mb-2 text-sm font-semibold text-success'>Password updated</p>

        <h1 className='m-0 font-prosto text-[clamp(30px,4vw,38px)] font-normal leading-[1.2] text-text-primary'>
          You’re all set
        </h1>

        <p className='mt-3 text-[17px] leading-6 text-text-secondary'>
          Your password has been reset successfully. You can now sign in with your new password.
        </p>
      </header>

      <button
        type='button'
        onClick={onSignIn}
        className={`${styles.signInButton} inline-flex min-h-13 w-full cursor-pointer items-center justify-center rounded-[10px] px-5 text-base font-semibold`}
      >
        Continue to sign in
      </button>
    </div>
  )
}

export default ResetPasswordSuccess
