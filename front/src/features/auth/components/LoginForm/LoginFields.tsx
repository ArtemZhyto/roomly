// Modules
import Link from 'next/link'

// Components
import FieldError from '@components-ui/FieldError'

// Lib
import getAuthInputClassName from '../../lib/getAuthInputClassName'

// Types
import type { LoginFieldsProps } from '../../types/login.types'

// Styles
import fieldStyles from '../../styles/auth-fields.module.scss'

const LoginFields = ({
  values,
  errors,
  isPasswordVisible,
  onChange,
  onPasswordVisibilityToggle,
}: LoginFieldsProps) => {
  return (
    <>
      <div className='flex flex-col gap-2'>
        <label htmlFor='email' className='text-[15px] font-semibold text-text-primary'>
          Email address
        </label>

        <div className={getAuthInputClassName(Boolean(errors.email))}>
          <span
            className='grid h-full basis-10.5 shrink-0 cursor-default select-none place-items-center text-base text-text-muted'
            aria-hidden='true'
          >
            @
          </span>

          <input
            id='email'
            name='email'
            type='email'
            value={values.email}
            onChange={onChange}
            placeholder='alex.morgan@roomly.ua'
            autoComplete='email'
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'login-email-error' : undefined}
            className={fieldStyles.input}
          />
        </div>

        {errors.email && <FieldError id='login-email-error' message={errors.email} />}
      </div>

      <div className='flex flex-col gap-2'>
        <div className='flex items-center justify-between gap-4'>
          <label htmlFor='password' className='text-[15px] font-semibold text-text-primary'>
            Password
          </label>

          <Link
            href='/forgot-password'
            className='text-sm font-semibold text-primary no-underline hover:underline'
          >
            Forgot password?
          </Link>
        </div>

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
            placeholder='Enter your password'
            autoComplete='current-password'
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? 'login-password-error' : undefined}
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

        {errors.password && <FieldError id='login-password-error' message={errors.password} />}
      </div>
    </>
  )
}

export default LoginFields
