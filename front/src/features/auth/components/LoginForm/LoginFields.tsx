// Modules
import Link from 'next/link'

// Components
import FieldError from '@components-ui/FieldError'
import AuthPasswordField from '../AuthPasswordField'

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
  const forgotPasswordLink = (
    <Link
      href='/forgot-password'
      className='text-sm font-semibold text-primary no-underline hover:underline'
    >
      Forgot password?
    </Link>
  )

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

      <AuthPasswordField
        id='password'
        name='password'
        label='Password'
        labelAside={forgotPasswordLink}
        value={values.password}
        placeholder='Enter your password'
        autoComplete='current-password'
        error={errors.password}
        errorId='login-password-error'
        isVisible={isPasswordVisible}
        onChange={onChange}
        onVisibilityToggle={onPasswordVisibilityToggle}
      />
    </>
  )
}

export default LoginFields
