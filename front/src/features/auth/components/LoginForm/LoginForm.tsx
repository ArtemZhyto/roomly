'use client'

// Modules
import Link from 'next/link'

// Components
import AuthSubmitButton from '../AuthSubmitButton'
import AuthFormError from '../AuthFormError'
import LoginFields from './LoginFields'

// Hooks
import useLoginForm from '../../hooks/useLoginForm'

const LoginForm = () => {
  const {
    values,
    errors,
    isPasswordVisible,
    isSubmitting,
    handleChange,
    handleSubmit,
    togglePasswordVisibility,
  } = useLoginForm()

  return (
    <div className='w-full font-afacad'>
      <header className='mb-7'>
        <p className='mb-2 text-sm font-semibold text-primary'>Welcome back</p>

        <h1 className='m-0 font-prosto text-[clamp(30px,4vw,38px)] font-normal leading-[1.2] text-text-primary'>
          Sign in
        </h1>

        <p className='mt-3 text-[17px] leading-6 text-text-secondary'>
          Sign in to manage your meetings and room bookings.
        </p>
      </header>

      {errors.form && <AuthFormError message={errors.form} className='mb-5' />}

      <form className='flex flex-col gap-4.5' onSubmit={handleSubmit} noValidate>
        <LoginFields
          values={values}
          errors={errors}
          isPasswordVisible={isPasswordVisible}
          onChange={handleChange}
          onPasswordVisibilityToggle={togglePasswordVisibility}
        />

        <div className='mt-6.25'>
          <AuthSubmitButton label='Sign in' loadingLabel='Signing in...' isLoading={isSubmitting} />
        </div>
      </form>

      <p className='mt-6 text-center text-base text-text-secondary'>
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
