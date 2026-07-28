'use client'

// Modules
import Link from 'next/link'

// Components
import AuthSubmitButton from '../AuthSubmitButton'
import AuthFormError from '../AuthFormError'
import RegisterFields from './RegisterFields'
import RegisterPasswordFields from './RegisterPasswordFields'
import RegisterTerms from './RegisterTerms'

// Hooks
import useRegisterForm from '@features/auth/hooks/useRegisterForm'

const RegisterForm = () => {
  const {
    values,
    errors,
    isPasswordVisible,
    isConfirmPasswordVisible,
    isSubmitting,
    handleChange,
    handleSubmit,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  } = useRegisterForm()

  return (
    <div className='w-full font-afacad'>
      <header className='mb-7'>
        <p className='mb-2 text-sm font-semibold text-primary'>Join Roomly</p>

        <h1 className='m-0 font-prosto text-[clamp(30px,4vw,38px)] font-normal leading-[1.2] text-text-primary'>
          Create account
        </h1>

        <p className='mt-3 text-[17px] leading-6 text-text-secondary'>
          Create your account and start booking rooms in seconds.
        </p>
      </header>

      {errors.form && <AuthFormError message={errors.form} className='mb-5' />}

      <form className='flex flex-col gap-4.5' onSubmit={handleSubmit} noValidate>
        <RegisterFields values={values} errors={errors} onChange={handleChange} />

        <RegisterPasswordFields
          values={values}
          errors={errors}
          isPasswordVisible={isPasswordVisible}
          isConfirmPasswordVisible={isConfirmPasswordVisible}
          onChange={handleChange}
          onPasswordVisibilityToggle={togglePasswordVisibility}
          onConfirmPasswordVisibilityToggle={toggleConfirmPasswordVisibility}
        />

        <RegisterTerms
          accepted={values.acceptedTerms}
          error={errors.acceptedTerms}
          onChange={handleChange}
        />

        <AuthSubmitButton
          label='Create account'
          loadingLabel='Creating account...'
          isLoading={isSubmitting}
        />
      </form>

      <p className='mt-6 text-center text-base text-text-secondary'>
        Already have an account?{' '}
        <Link href='/login' className='font-semibold text-secondary no-underline hover:underline'>
          Sign in
        </Link>
      </p>
    </div>
  )
}

export default RegisterForm
