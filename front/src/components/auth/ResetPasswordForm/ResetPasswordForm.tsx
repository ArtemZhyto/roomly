'use client'

// Modules
import Link from 'next/link'
import { type ChangeEvent, type FormEvent, useState } from 'react'

// Components
import FieldError from '@components-ui/FieldError/FieldError'

interface ResetPasswordFormProps {
  token?: string
}

interface ResetPasswordValues {
  password: string
  confirmPassword: string
}

interface ResetPasswordErrors {
  password?: string
  confirmPassword?: string
  form?: string
}

const initialValues: ResetPasswordValues = {
  password: '',
  confirmPassword: '',
}

const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const [values, setValues] = useState<ResetPasswordValues>(initialValues)
  const [errors, setErrors] = useState<ResetPasswordErrors>({})
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: undefined,
      form: undefined,
    }))
  }

  const validate = (): ResetPasswordErrors => {
    const nextErrors: ResetPasswordErrors = {}

    if (!values.password) {
      nextErrors.password = 'Password is required.'
    } else if (values.password.length < 8) {
      nextErrors.password = 'Password must contain at least 8 characters.'
    } else if (!/[A-Z]/.test(values.password)) {
      nextErrors.password = 'Password must contain at least one uppercase letter.'
    } else if (!/[a-z]/.test(values.password)) {
      nextErrors.password = 'Password must contain at least one lowercase letter.'
    } else if (!/\d/.test(values.password)) {
      nextErrors.password = 'Password must contain at least one number.'
    }

    if (!values.confirmPassword) {
      nextErrors.confirmPassword = 'Confirm your password.'
    } else if (values.confirmPassword !== values.password) {
      nextErrors.confirmPassword = 'Passwords do not match.'
    }

    return nextErrors
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const validationErrors = validate()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    if (!token) {
      setErrors({
        form: 'This password reset link is invalid or has expired.',
      })
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      // TODO: Send token and new password to the password reset API.
      await new Promise((resolve) => setTimeout(resolve, 700))

      setIsCompleted(true)
    } catch {
      setErrors({
        form: 'We couldn’t reset your password. The link may have expired.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputWrapperClass = (hasError: boolean) =>
    [
      'flex min-h-[52px] items-center overflow-hidden rounded-[10px]',
      'border-[1.5px] bg-white shadow-[0_1px_2px_rgb(33_39_50_/_4%)]',
      'transition-[border-color,box-shadow] duration-150',
      hasError
        ? [
            'border-[#ef4444]',
            'hover:border-[#ef4444]',
            'focus-within:border-[#ef4444]',
            'focus-within:shadow-[0_0_0_3px_rgb(239_68_68_/_14%)]',
          ].join(' ')
        : [
            'border-[#cbd5e1]',
            'hover:border-[#94a3b8]',
            'focus-within:border-[#06b6d4]',
            'focus-within:shadow-[0_0_0_3px_rgb(6_182_212_/_14%)]',
          ].join(' '),
    ].join(' ')

  const inputClassName =
    'h-12.5 w-full min-w-0 border-0 bg-transparent px-3 text-base text-text-primary outline-none placeholder:text-[#b6c0ce] placeholder:opacity-100 focus:outline-none focus-visible:outline-none'

  if (isCompleted) {
    return (
      <div className='w-full max-w-110 font-afacad'>
        <div
          className='mb-6 grid size-14 place-items-center rounded-full bg-primary-subtle text-2xl font-semibold text-primary select-none cursor-default'
          aria-hidden='true'
        >
          ✓
        </div>

        <header className='mb-7'>
          <p className='mb-2 text-sm font-semibold text-primary'>Password updated</p>

          <h1 className='font-prosto text-[clamp(30px,4vw,38px)] leading-[1.2] text-text-primary'>
            You’re all set
          </h1>

          <p className='mt-3 text-[17px] leading-6 text-text-secondary'>
            Your password has been changed successfully. You can now sign in with your new password.
          </p>
        </header>

        <Link
          href='/login'
          className='inline-flex min-h-13 w-full items-center justify-center rounded-[10px] border border-[#06b6d4] bg-[#06b6d4] px-5 text-base font-semibold text-white no-underline shadow-[0_4px_12px_rgb(6_182_212/20%)] transition-[background-color,border-color,box-shadow,transform] duration-150 hover:border-[#0891b2] hover:bg-[#0891b2] hover:text-white hover:shadow-[0_6px_18px_rgb(6_182_212/25%)] active:scale-[0.99]'
        >
          Continue to sign in
        </Link>
      </div>
    )
  }

  return (
    <div className='w-full max-w-110 font-afacad'>
      <header className='mb-8'>
        <p className='mb-2 text-sm font-semibold text-primary'>Password recovery</p>

        <h1 className='font-prosto text-[clamp(30px,4vw,38px)] leading-[1.2] text-text-primary'>
          Create a new password
        </h1>

        <p className='mt-3 text-[17px] leading-6 text-text-secondary'>
          Choose a strong password that you haven’t used before.
        </p>
      </header>

      {errors.form && (
        <div
          className='mb-5 flex items-start gap-3 rounded-input border border-error/20 bg-error-light px-4 py-3.5 text-[15px] text-error-dark'
          role='alert'
        >
          <span
            className='grid size-5 shrink-0 place-items-center rounded-full bg-error text-xs font-bold text-white'
            aria-hidden='true'
          >
            !
          </span>

          <span>{errors.form}</span>
        </div>
      )}

      <form className='flex flex-col gap-5' onSubmit={handleSubmit} noValidate>
        <div className='flex flex-col gap-2'>
          <label htmlFor='password' className='text-[15px] font-semibold text-text-primary'>
            New password
          </label>

          <div className={inputWrapperClass(Boolean(errors.password))}>
            <span
              className='pointer-default grid h-full basis-10.5 select-none place-items-center text-base text-text-muted'
              aria-hidden='true'
            >
              •
            </span>

            <input
              id='password'
              name='password'
              type={isPasswordVisible ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange}
              placeholder='Enter a new password'
              autoComplete='new-password'
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? 'reset-password-error' : undefined}
              className={inputClassName}
            />

            <button
              type='button'
              onClick={() => {
                setIsPasswordVisible((currentValue) => !currentValue)
              }}
              className='min-h-10 shrink-0 cursor-pointer rounded-control bg-transparent px-3.5 text-sm font-semibold text-text-secondary transition-colors duration-150 hover:bg-surface-secondary hover:text-primary focus-visible:bg-surface-secondary focus-visible:text-primary active:bg-primary-subtle'
              aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
              aria-pressed={isPasswordVisible}
            >
              {isPasswordVisible ? 'Hide' : 'Show'}
            </button>
          </div>

          {errors.password && <FieldError id='reset-password-error' message={errors.password} />}
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='confirmPassword' className='text-[15px] font-semibold text-text-primary'>
            Confirm new password
          </label>

          <div className={inputWrapperClass(Boolean(errors.confirmPassword))}>
            <span
              className='pointer-default grid h-full basis-10.5 select-none place-items-center text-base text-text-muted'
              aria-hidden='true'
            >
              •
            </span>

            <input
              id='confirmPassword'
              name='confirmPassword'
              type={isConfirmPasswordVisible ? 'text' : 'password'}
              value={values.confirmPassword}
              onChange={handleChange}
              placeholder='Repeat your new password'
              autoComplete='new-password'
              aria-invalid={Boolean(errors.confirmPassword)}
              aria-describedby={errors.confirmPassword ? 'confirm-reset-password-error' : undefined}
              className={inputClassName}
            />

            <button
              type='button'
              onClick={() => {
                setIsConfirmPasswordVisible((currentValue) => !currentValue)
              }}
              className='min-h-10 shrink-0 cursor-pointer rounded-control bg-transparent px-3.5 text-sm font-semibold text-text-secondary transition-colors duration-150 hover:bg-surface-secondary hover:text-primary focus-visible:bg-surface-secondary focus-visible:text-primary active:bg-primary-subtle'
              aria-label={
                isConfirmPasswordVisible ? 'Hide confirmed password' : 'Show confirmed password'
              }
              aria-pressed={isConfirmPasswordVisible}
            >
              {isConfirmPasswordVisible ? 'Hide' : 'Show'}
            </button>
          </div>

          {errors.confirmPassword && (
            <FieldError id='confirm-reset-password-error' message={errors.confirmPassword} />
          )}
        </div>

        <div className='rounded-input border border-border-primary bg-surface-secondary px-4 py-3 text-sm leading-5 text-text-secondary'>
          Use at least 8 characters, including uppercase and lowercase letters and a number.
        </div>

        <button
          type='submit'
          disabled={isSubmitting}
          className='inline-flex min-h-13 w-full cursor-pointer items-center justify-center gap-2.5 rounded-[10px] border border-[#06b6d4] bg-[#06b6d4] px-5 text-base font-semibold text-white shadow-[0_4px_12px_rgb(6_182_212/20%)] transition-[background-color,border-color,box-shadow,transform] duration-150 hover:border-[#0891b2] hover:bg-[#0891b2] hover:text-white hover:shadow-[0_6px_18px_rgb(6_182_212/25%)] focus-visible:border-[#0891b2] focus-visible:bg-[#0891b2] focus-visible:text-white active:scale-[0.99] active:border-[#0e7490] active:bg-[#0e7490] disabled:pointer-events-none disabled:bg-[#06b6d4] disabled:text-white disabled:opacity-65'
        >
          {isSubmitting && (
            <span
              className='size-4.25 animate-spin rounded-full border-2 border-white/35 border-t-white'
              aria-hidden='true'
            />
          )}

          <span className='select-none cursor-default'>
            {isSubmitting ? 'Updating password...' : 'Reset password'}
          </span>
        </button>
      </form>

      <p className='mt-7 text-center text-base text-text-secondary'>
        Return to{' '}
        <Link href='/login' className='font-semibold text-secondary no-underline hover:underline'>
          sign in
        </Link>
      </p>
    </div>
  )
}

export default ResetPasswordForm
