// Modules
import Link from 'next/link'

// Components
import AuthSubmitButton from '../AuthSubmitButton'

// Types
import type { CheckEmailActionsProps } from '../../types/verification.types'

// Styles
import styles from './CheckEmailContent.module.scss'

const CheckEmailActions = ({ email, isResending, onResend }: CheckEmailActionsProps) => {
  return (
    <div className='mt-5 flex flex-col gap-3'>
      <AuthSubmitButton
        type='button'
        label='Resend email'
        loadingLabel='Resending...'
        isLoading={isResending}
        disabled={!email}
        onClick={onResend}
      />

      <Link
        href='/forgot-password'
        className={`${styles.secondaryLink} inline-flex min-h-13 w-full items-center justify-center rounded-[10px] border px-5 text-base font-semibold no-underline`}
      >
        Use another email
      </Link>
    </div>
  )
}

export default CheckEmailActions
