// Components
import FieldError from '@components/ui/FieldError'

// Lib
import getAuthInputClassName from '../../lib/getAuthInputClassName'

// Types
import type { ResetPasswordFieldsProps } from '../../types/resetPassword.types'

// Styles
import fieldStyles from '../../styles/auth-fields.module.scss'
import styles from './ResetPasswordForm.module.scss'

const ResetPasswordFields = ({
  values,
  errors,
  isPasswordVisible,
  isConfirmPasswordVisible,
  onChange,
  onPasswordVisibilityToggle,
  onConfirmPasswordVisibilityToggle,
}: ResetPasswordFieldsProps) => {
  return (
    <>
      <div className='flex flex-col gap-2'>
        <label htmlFor='password' className='text-[15px] font-semibold text-text-primary'>
          New password
        </label>

        <div className={getAuthInputClassName(Boolean(errors.password))}>
          <span
            className='grid h-full basis-10.5 shrink-0 cursor-default select-none place-items-center text-base text-text-muted'
            aria-hidden='true'
          >
            •
          </span>

          <input
            id='password'
            name='password'
            type={isPasswordVisible ? 'text' : 'password'}
            value={values.password}
            onChange={onChange}
            placeholder='Enter a new password'
            autoComplete='new-password'
            minLength={8}
            maxLength={72}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? 'reset-password-error' : 'reset-password-hint'}
            className={`${fieldStyles.input} ${fieldStyles.passwordInput}`}
          />

          <button
            type='button'
            className={fieldStyles.visibilityButton}
            onClick={onPasswordVisibilityToggle}
            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
            aria-pressed={isPasswordVisible}
          >
            {isPasswordVisible ? 'Hide' : 'Show'}
          </button>
        </div>

        {errors.password ? (
          <FieldError id='reset-password-error' message={errors.password} />
        ) : (
          <p id='reset-password-hint' className={styles.passwordHint}>
            Use between 8 and 72 characters. Letters, numbers, and symbols are optional.
          </p>
        )}
      </div>

      <div className='flex flex-col gap-2'>
        <label htmlFor='confirmPassword' className='text-[15px] font-semibold text-text-primary'>
          Confirm new password
        </label>

        <div className={getAuthInputClassName(Boolean(errors.confirmPassword))}>
          <span
            className='grid h-full basis-10.5 shrink-0 cursor-default select-none place-items-center text-base text-text-muted'
            aria-hidden='true'
          >
            •
          </span>

          <input
            id='confirmPassword'
            name='confirmPassword'
            type={isConfirmPasswordVisible ? 'text' : 'password'}
            value={values.confirmPassword}
            onChange={onChange}
            placeholder='Repeat your new password'
            autoComplete='new-password'
            minLength={8}
            maxLength={72}
            aria-invalid={Boolean(errors.confirmPassword)}
            aria-describedby={errors.confirmPassword ? 'reset-confirm-password-error' : undefined}
            className={`${fieldStyles.input} ${fieldStyles.passwordInput}`}
          />

          <button
            type='button'
            className={fieldStyles.visibilityButton}
            onClick={onConfirmPasswordVisibilityToggle}
            aria-label={
              isConfirmPasswordVisible ? 'Hide confirmed password' : 'Show confirmed password'
            }
            aria-pressed={isConfirmPasswordVisible}
          >
            {isConfirmPasswordVisible ? 'Hide' : 'Show'}
          </button>
        </div>

        {errors.confirmPassword && (
          <FieldError id='reset-confirm-password-error' message={errors.confirmPassword} />
        )}
      </div>
    </>
  )
}

export default ResetPasswordFields
