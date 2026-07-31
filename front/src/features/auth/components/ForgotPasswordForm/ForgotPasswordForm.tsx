'use client'

// Modules
import Link from 'next/link'

// Components
import AuthSubmitButton from '../AuthSubmitButton'
import AuthFormError from '../AuthFormError'
import ForgotPasswordField from './ForgotPasswordField'

// Hooks
import useForgotPasswordForm from '../../hooks/useForgotPasswordForm'

const ForgotPasswordForm = () => {
  const { values, errors, isSubmitting, isSent, cooldown, handleChange, handleSubmit } =
    useForgotPasswordForm()

  const submitLabel =
    cooldown > 0 ? `Resend link in ${cooldown}s` : isSent ? 'Resend reset link' : 'Send reset link'

  return (
    <div className='w-full font-afacad'>
      <header className='mb-7'>
        <p className='mb-2 text-sm font-semibold text-primary'>Password recovery</p>

        <h1 className='m-0 font-prosto text-[clamp(30px,4vw,38px)] font-normal leading-[1.2] text-text-primary'>
          Forgot password?
        </h1>

        <p className='mt-3 text-[17px] leading-6 text-text-secondary'>
          Enter your email address and we’ll send you instructions to reset your password.
        </p>
      </header>

      {errors.form && <AuthFormError message={errors.form} className='mb-5' />}

      {isSent && (
        <div
          className='mb-5 rounded-[10px] border border-success/30 bg-success/10 px-4 py-3 text-[15px] text-success'
          role='status'
          aria-live='polite'
        >
          If an account with this email exists, a password reset link has been generated.
        </div>
      )}

      <form className='flex flex-col gap-4.5' onSubmit={handleSubmit} noValidate>
        <ForgotPasswordField value={values.email} error={errors.email} onChange={handleChange} />

        <AuthSubmitButton
          label={submitLabel}
          loadingLabel='Sending...'
          isLoading={isSubmitting}
          disabled={cooldown > 0}
        />
      </form>

      <p className='mt-6 text-center text-base text-text-secondary'>
        Remembered your password?{' '}
        <Link href='/login' className='font-semibold text-secondary no-underline hover:underline'>
          Back to sign in
        </Link>
      </p>
    </div>
  )
}

export default ForgotPasswordForm
