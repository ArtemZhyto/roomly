// Components
import FieldError from '@components-ui/FieldError'

// Lib
import getAuthInputClassName from '../../lib/getAuthInputClassName'

// Types
import type { ForgotPasswordFieldProps } from '../../types/forgotPassword.types'

// Styles
import fieldStyles from '../../styles/auth-fields.module.scss'

const ForgotPasswordField = ({ value, error, onChange }: ForgotPasswordFieldProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <label htmlFor='email' className='text-[15px] font-semibold text-text-primary'>
        Email address
      </label>

      <div className={getAuthInputClassName(Boolean(error))}>
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
          value={value}
          onChange={onChange}
          placeholder='alex.morgan@roomly.ua'
          autoComplete='email'
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'forgot-password-email-error' : undefined}
          className={fieldStyles.input}
        />
      </div>

      {error && <FieldError id='forgot-password-email-error' message={error} />}
    </div>
  )
}

export default ForgotPasswordField
