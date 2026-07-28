// Components
import FieldError from '@components/ui/FieldError'

// Lib
import getAuthInputClassName from '../../lib/getAuthInputClassName'

// Types
import type { RegisterPasswordFieldsProps } from '../../types/register.types'

// Styles
import fieldStyles from '../../styles/auth-fields.module.scss'

const RegisterPasswordFields = ({
  values,
  errors,
  isPasswordVisible,
  isConfirmPasswordVisible,
  onChange,
  onPasswordVisibilityToggle,
  onConfirmPasswordVisibilityToggle,
}: RegisterPasswordFieldsProps) => {
  return (
    <div className='grid grid-cols-2 gap-4 max-[560px]:grid-cols-1'>
      <div className='flex min-w-0 flex-col gap-2'>
        <label htmlFor='password' className='text-[15px] font-semibold text-text-primary'>
          Password
        </label>

        <div className={getAuthInputClassName(Boolean(errors.password))}>
          <span
            className='grid h-full basis-9.5 shrink-0 cursor-default select-none place-items-center text-base text-text-muted'
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
            placeholder='Password'
            autoComplete='new-password'
            minLength={8}
            maxLength={72}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? 'register-password-error' : undefined}
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

        {errors.password && <FieldError id='register-password-error' message={errors.password} />}
      </div>

      <div className='flex min-w-0 flex-col gap-2'>
        <label htmlFor='confirmPassword' className='text-[15px] font-semibold text-text-primary'>
          Confirm password
        </label>

        <div className={getAuthInputClassName(Boolean(errors.confirmPassword))}>
          <span
            className='grid h-full basis-9.5 shrink-0 cursor-default select-none place-items-center text-base text-text-muted'
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
            placeholder='Repeat'
            autoComplete='new-password'
            minLength={8}
            maxLength={72}
            aria-invalid={Boolean(errors.confirmPassword)}
            aria-describedby={
              errors.confirmPassword ? 'register-confirm-password-error' : undefined
            }
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
          <FieldError id='register-confirm-password-error' message={errors.confirmPassword} />
        )}
      </div>
    </div>
  )
}

export default RegisterPasswordFields
