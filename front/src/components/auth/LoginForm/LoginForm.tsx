'use client'

// Modules
import Link from 'next/link'
import { type ChangeEvent, type FormEvent, useState } from 'react'

// Components
import FieldError from '@components/ui/FieldError/FieldError'

interface LoginValues {
  email: string
  password: string
}

interface LoginErrors {
  email?: string
  password?: string
  form?: string
}

const initialValues: LoginValues = {
  email: '',
  password: '',
}

const LoginForm = () => {
  const [values, setValues] = useState<LoginValues>(initialValues)
  const [errors, setErrors] = useState<LoginErrors>({})
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const validate = (): LoginErrors => {
    const nextErrors: LoginErrors = {}

    if (!values.email.trim()) {
      nextErrors.email = 'Email address is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = 'Enter a valid email address.'
    }

    if (!values.password) {
      nextErrors.password = 'Password is required.'
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

    setIsSubmitting(true)
    setErrors({})

    try {
      // TODO: Send login request, store auth session and redirect the user
      await new Promise((resolve) => setTimeout(resolve, 500))
    } catch {
      setErrors({
        form: 'We couldn’t sign you in. Please try again.',
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

  return (
    <div className='w-full max-w-110 font-afacad'>
      <header className='mb-8'>
        <p className='mb-2 text-sm font-semibold text-primary'>Welcome to Roomly</p>

        <h1 className='font-prosto text-[clamp(30px,4vw,38px)] leading-[1.2] text-text-primary'>
          Welcome back
        </h1>

        <p className='mt-3 text-[17px] leading-6 text-text-secondary'>
          Sign in to manage your rooms and bookings.
        </p>
      </header>

      <form className='flex flex-col gap-5' onSubmit={handleSubmit} noValidate>
        <div className='flex flex-col gap-2'>
          <label htmlFor='email' className='text-[15px] font-semibold text-text-primary'>
            Email address
          </label>

          <div className={inputWrapperClass(Boolean(errors.email))}>
            <span
              className='grid h-full basis-10.5 place-items-center text-base text-text-muted select-none pointer-default'
              aria-hidden='true'
            >
              @
            </span>

            <input
              id='email'
              name='email'
              type='email'
              value={values.email}
              onChange={handleChange}
              placeholder='alex.morgan@roomly.ua'
              autoComplete='email'
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className='h-12.5 w-full min-w-0 border-0 bg-transparent px-3 text-base text-[#212732] outline-none placeholder:text-[#b6c0ce] placeholder:opacity-100 focus:outline-none focus-visible:outline-none'
            />
          </div>

          {errors.email && <FieldError id='email-error' message={errors.email} />}
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

          <div className={inputWrapperClass(Boolean(errors.password))}>
            <span
              className='grid h-full basis-10.5 place-items-center text-base text-text-muted select-none pointer-default'
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
              placeholder='Enter your password'
              autoComplete='current-password'
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? 'password-error' : undefined}
              className='h-12.5 w-full min-w-0 border-0 bg-transparent px-3 text-base text-[#212732] outline-none placeholder:text-[#b6c0ce] placeholder:opacity-100 focus:outline-none focus-visible:outline-none'
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

          {errors.password && <FieldError id='password-error' message={errors.password} />}
        </div>

        <label className='inline-flex cursor-pointer items-center gap-2.5 self-start text-[15px] text-text-secondary'>
          <input
            type='checkbox'
            name='remember'
            className='size-4.25 accent-primary cursor-pointer'
          />

          <span>Remember me</span>
        </label>

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
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </span>
        </button>
      </form>

      <p className='mt-7 text-center text-base text-text-secondary'>
        Don’t have an account?{' '}
        <Link
          href='/register'
          className='font-semibold text-secondary no-underline hover:underline'
        >
          Create account
        </Link>
      </p>
    </div>
  )
}

export default LoginForm
