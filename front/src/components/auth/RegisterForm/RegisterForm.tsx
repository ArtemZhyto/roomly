'use client'

// Modules
import Link from 'next/link'
import { type ChangeEvent, type FormEvent, useState } from 'react'

// Components
import FieldError from '@components/ui/FieldError/FieldError'

interface RegisterValues {
  name: string
  email: string
  password: string
  confirmPassword: string
  acceptedTerms: boolean
}

interface RegisterErrors {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
  acceptedTerms?: string
  form?: string
}

const initialValues: RegisterValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptedTerms: false,
}

const RegisterForm = () => {
  const [values, setValues] = useState<RegisterValues>(initialValues)
  const [errors, setErrors] = useState<RegisterErrors>({})
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target

    setValues((currentValues) => ({
      ...currentValues,
      [name]: type === 'checkbox' ? checked : value,
    }))

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: undefined,
      form: undefined,
    }))
  }

  const validate = (): RegisterErrors => {
    const nextErrors: RegisterErrors = {}

    const normalizedName = values.name.trim()
    const normalizedEmail = values.email.trim()

    if (!normalizedName) {
      nextErrors.name = 'Name is required.'
    } else if (normalizedName.length < 2) {
      nextErrors.name = 'Name must contain at least 2 characters.'
    }

    if (!normalizedEmail) {
      nextErrors.email = 'Email address is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      nextErrors.email = 'Enter a valid email address.'
    }

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

    if (!values.acceptedTerms) {
      nextErrors.acceptedTerms = 'You must accept the Terms and Privacy Policy.'
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
      // TODO: Send registration request and redirect to email verification
      await new Promise((resolve) => setTimeout(resolve, 600))
    } catch {
      setErrors({
        form: 'We couldn’t create your account. Please try again.',
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
    'h-[50px] w-full min-w-0 border-0 bg-transparent px-3 text-base text-[#212732] outline-none placeholder:text-[#b6c0ce] placeholder:opacity-100 focus:outline-none focus-visible:outline-none'

  return (
    <div className='w-full max-w-110 font-afacad'>
      <header className='mb-7'>
        <p className='mb-2 text-sm font-semibold text-[#06b6d4]'>Join Roomly</p>

        <h1 className='m-0 font-prosto text-[clamp(30px,4vw,38px)] font-normal leading-[1.2] text-[#212732]'>
          Create account
        </h1>

        <p className='mt-3 text-[17px] leading-6 text-[#64748b]'>
          Create your account and start booking rooms in seconds.
        </p>
      </header>

      <form className='flex flex-col gap-4.5' onSubmit={handleSubmit} noValidate>
        <div className='flex flex-col gap-2'>
          <label htmlFor='name' className='text-[15px] font-semibold text-[#212732]'>
            Full name
          </label>

          <div className={inputWrapperClass(Boolean(errors.name))}>
            <span
              className='grid h-full basis-10.5 place-items-center text-base text-[#94a3b8] select-none cursor-default'
              aria-hidden='true'
            >
              ◯
            </span>

            <input
              id='name'
              name='name'
              type='text'
              value={values.name}
              onChange={handleChange}
              placeholder='Alex Morgan'
              autoComplete='name'
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className={inputClassName}
            />
          </div>

          {errors.name && <FieldError id='name-error' message={errors.name} />}
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='email' className='text-[15px] font-semibold text-[#212732]'>
            Email address
          </label>

          <div className={inputWrapperClass(Boolean(errors.email))}>
            <span
              className='grid h-full basis-10.5 place-items-center text-base text-[#94a3b8] select-none cursor-default'
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
              className={inputClassName}
            />
          </div>

          {errors.email && <FieldError id='email-error' message={errors.email} />}
        </div>

        <div className='grid grid-cols-2 gap-4 max-[560px]:grid-cols-1'>
          <div className='flex min-w-0 flex-col gap-2'>
            <label htmlFor='password' className='text-[15px] font-semibold text-[#212732]'>
              Password
            </label>

            <div className={inputWrapperClass(Boolean(errors.password))}>
              <span
                className='grid h-full basis-9.5 place-items-center text-base text-[#94a3b8] select-none cursor-default'
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
                placeholder='Password'
                autoComplete='new-password'
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? 'password-error' : undefined}
                className={`${inputClassName} px-2`}
              />

              <button
                type='button'
                className='min-h-10 shrink-0 cursor-pointer bg-transparent px-2.5 text-xs font-semibold text-[#64748b] transition-colors duration-150 hover:text-[#06b6d4]'
                onClick={() => {
                  setIsPasswordVisible((currentValue) => !currentValue)
                }}
                aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
                aria-pressed={isPasswordVisible}
              >
                {isPasswordVisible ? 'Hide' : 'Show'}
              </button>
            </div>

            {errors.password && <FieldError id='password-error' message={errors.password} />}
          </div>

          <div className='flex min-w-0 flex-col gap-2'>
            <label htmlFor='confirmPassword' className='text-[15px] font-semibold text-[#212732]'>
              Confirm password
            </label>

            <div className={inputWrapperClass(Boolean(errors.confirmPassword))}>
              <span
                className='grid h-full basis-9.5 place-items-center text-base text-[#94a3b8] select-none cursor-default'
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
                placeholder='Repeat'
                autoComplete='new-password'
                aria-invalid={Boolean(errors.confirmPassword)}
                aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
                className={`${inputClassName} px-2`}
              />

              <button
                type='button'
                className='min-h-10 shrink-0 cursor-pointer bg-transparent px-2.5 text-xs font-semibold text-[#64748b] transition-colors duration-150 hover:text-[#06b6d4]'
                onClick={() => {
                  setIsConfirmPasswordVisible((currentValue) => !currentValue)
                }}
                aria-label={
                  isConfirmPasswordVisible ? 'Hide confirmed password' : 'Show confirmed password'
                }
                aria-pressed={isConfirmPasswordVisible}
              >
                {isConfirmPasswordVisible ? 'Hide' : 'Show'}
              </button>
            </div>

            {errors.confirmPassword && (
              <FieldError id='confirm-password-error' message={errors.confirmPassword} />
            )}
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <label className='flex cursor-pointer items-start gap-2.5 text-[15px] leading-5 text-[#64748b]'>
            <input
              type='checkbox'
              name='acceptedTerms'
              checked={values.acceptedTerms}
              onChange={handleChange}
              className='mt-0.5 size-4.25 shrink-0 accent-[#06b6d4] select-none cursor-pointer'
              aria-invalid={Boolean(errors.acceptedTerms)}
              aria-describedby={errors.acceptedTerms ? 'terms-error' : undefined}
            />

            <span>
              I agree to the{' '}
              <Link
                href='/terms'
                className='font-semibold text-[#06b6d4] no-underline hover:underline'
              >
                Terms
              </Link>{' '}
              and{' '}
              <Link
                href='/privacy'
                className='font-semibold text-[#06b6d4] no-underline hover:underline'
              >
                Privacy Policy
              </Link>
              .
            </span>
          </label>

          {errors.acceptedTerms && <FieldError id='terms-error' message={errors.acceptedTerms} />}
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
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </span>
        </button>
      </form>

      <p className='mt-6 text-center text-base text-[#64748b]'>
        Already have an account?{' '}
        <Link href='/login' className='font-semibold text-[#6366f1] no-underline hover:underline'>
          Sign in
        </Link>
      </p>
    </div>
  )
}

export default RegisterForm
