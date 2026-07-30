// Components
import AuthSubmitButton from '../AuthSubmitButton'
import FieldError from '@components-ui/FieldError'

// Types
import type { VerificationCodeFormProps } from '../../types/verification.types'

// Styles
import styles from './VerifyEmailContent.module.scss'

const VerificationCodeForm = ({
  code,
  error,
  isSubmitting,
  onChange,
  onSubmit,
}: VerificationCodeFormProps) => {
  return (
    <form className='mt-6 flex flex-col gap-4' onSubmit={onSubmit} noValidate>
      <div className='flex flex-col gap-2'>
        <label htmlFor='verification-code' className='text-[15px] font-semibold text-text-primary'>
          Verification code
        </label>

        <input
          id='verification-code'
          name='code'
          type='text'
          inputMode='numeric'
          autoComplete='one-time-code'
          value={code}
          onChange={onChange}
          placeholder='000000'
          maxLength={6}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'verification-code-error' : undefined}
          className={styles.codeInput}
        />

        {error && <FieldError id='verification-code-error' message={error} />}
      </div>

      <AuthSubmitButton label='Verify email' loadingLabel='Verifying...' isLoading={isSubmitting} />
    </form>
  )
}

export default VerificationCodeForm
