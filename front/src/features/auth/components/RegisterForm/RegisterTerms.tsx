// Modules
import Link from 'next/link'

// Components
import FieldError from '@components-ui/FieldError'

// Types
import type { RegisterTermsProps } from '../../types/register.types'

const RegisterTerms = ({ accepted, error, onChange }: RegisterTermsProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <label className='flex cursor-pointer items-start gap-2.5 text-[15px] leading-5 text-text-secondary'>
        <input
          type='checkbox'
          name='acceptedTerms'
          checked={accepted}
          onChange={onChange}
          className='mt-0.5 size-4.25 shrink-0 cursor-pointer accent-primary'
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'register-terms-error' : undefined}
        />

        <span>
          I agree to the{' '}
          <Link href='/terms' className='font-semibold text-primary no-underline hover:underline'>
            Terms
          </Link>{' '}
          and{' '}
          <Link href='/privacy' className='font-semibold text-primary no-underline hover:underline'>
            Privacy Policy
          </Link>
          .
        </span>
      </label>

      {error && <FieldError id='register-terms-error' message={error} />}
    </div>
  )
}

export default RegisterTerms
