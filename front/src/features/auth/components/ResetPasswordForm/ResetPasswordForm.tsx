'use client'

// Modules
import Link from 'next/link'

// Components
import AuthSubmitButton from '../AuthSubmitButton'
import AuthFormError from '../AuthFormError'
import ResetPasswordFields from './ResetPasswordFields'
import ResetPasswordSuccess from './ResetPasswordSuccess'

// Hooks
import useResetPasswordForm from '../../hooks/useResetPasswordForm'

// Types
import type { ResetPasswordFormProps } from '../../types/resetPassword.types'

const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const {
    values,
    errors,
    isPasswordVisible,
    isConfirmPasswordVisible,
    isSubmitting,
    isSuccess,
    handleChange,
    handleSubmit,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    goToSignIn,
  } = useResetPasswordForm(token)

  if (isSuccess) {
    return <ResetPasswordSuccess onSignIn={goToSignIn} />
  }

  return (
    <div className='w-full font-afacad'>
      <header className='mb-7'>
        <p className='mb-2 text-sm font-semibold text-primary'>Password recovery</p>

        <h1 className='m-0 font-prosto text-[clamp(30px,4vw,38px)] font-normal leading-[1.2] text-text-primary'>
          Set a new password
        </h1>

        <p className='mt-3 text-[17px] leading-6 text-text-secondary'>
          Choose a new password for your Roomly account.
        </p>
      </header>

      {errors.form && <AuthFormError message={errors.form} className='mb-5' />}

      <form className='flex flex-col gap-4.5' onSubmit={handleSubmit} noValidate>
        <ResetPasswordFields
          values={values}
          errors={errors}
          isPasswordVisible={isPasswordVisible}
          isConfirmPasswordVisible={isConfirmPasswordVisible}
          onChange={handleChange}
          onPasswordVisibilityToggle={togglePasswordVisibility}
          onConfirmPasswordVisibilityToggle={toggleConfirmPasswordVisibility}
        />

        <AuthSubmitButton
          label='Reset password'
          loadingLabel='Resetting password...'
          isLoading={isSubmitting}
          disabled={!token}
        />
      </form>

      <p className='mt-6 text-center text-base text-text-secondary'>
        Need a new reset link?{' '}
        <Link
          href='/forgot-password'
          className='font-semibold text-primary no-underline hover:underline'
        >
          Request another
        </Link>
      </p>
    </div>
  )
}

export default ResetPasswordForm
