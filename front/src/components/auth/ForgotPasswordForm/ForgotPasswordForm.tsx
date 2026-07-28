'use client'

// Modules
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { type ChangeEvent, type FormEvent, useState } from 'react'

// Components
import FieldError from '@components-ui/FieldError/FieldError'

interface ForgotPasswordValues {
  email: string
}

interface ForgotPasswordErrors {
  email?: string
  form?: string
}

const initialValues: ForgotPasswordValues = {
  email: '',
}

const ForgotPasswordForm = () => {
  const [values, setValues] = useState<ForgotPasswordValues>(initialValues)
  const [errors, setErrors] = useState<ForgotPasswordErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()

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

  const validate = (): ForgotPasswordErrors => {
    const nextErrors: ForgotPasswordErrors = {}
    const normalizedEmail = values.email.trim()

    if (!normalizedEmail) {
      nextErrors.email = 'Email address is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      nextErrors.email = 'Enter a valid email address.'
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
      // TODO: Send password reset request and redirect to check-email.
      await new Promise((resolve) => setTimeout(resolve, 600))

      router.push(`/check-email?email=${encodeURIComponent(values.email.trim())}`)
    } catch {
      setErrors({
        form: 'We couldn’t send the reset link. Please try again.',
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
        <p className='mb-2 text-sm font-semibold text-primary'>Password recovery</p>

        <h1 className='font-prosto text-[clamp(30px,4vw,38px)] leading-[1.2] text-text-primary'>
          Forgot your password?
        </h1>

        <p className='mt-3 text-[17px] leading-6 text-text-secondary'>
          Enter your email address and we’ll send you a link to create a new password.
        </p>
      </header>

      <form className='flex flex-col gap-5' onSubmit={handleSubmit} noValidate>
        <div className='flex flex-col gap-2'>
          <label htmlFor='email' className='text-[15px] font-semibold text-text-primary'>
            Email address
          </label>

          <div className={inputWrapperClass(Boolean(errors.email))}>
            <span
              className='pointer-default grid h-full basis-10.5 select-none place-items-center text-base text-text-muted'
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
              aria-describedby={errors.email ? 'forgot-email-error' : undefined}
              className='h-12.5 w-full min-w-0 border-0 bg-transparent px-3 text-base text-text-primary outline-none placeholder:text-[#b6c0ce] placeholder:opacity-100 focus:outline-none focus-visible:outline-none'
            />
          </div>

          {errors.email && <FieldError id='forgot-email-error' message={errors.email} />}
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

          <span>{isSubmitting ? 'Sending reset link...' : 'Send reset link'}</span>
        </button>
      </form>

      <p className='mt-7 text-center text-base text-text-secondary'>
        Remembered your password?{' '}
        <Link href='/login' className='font-semibold text-secondary no-underline hover:underline'>
          Back to sign in
        </Link>
      </p>
    </div>
  )
}

export default ForgotPasswordForm
