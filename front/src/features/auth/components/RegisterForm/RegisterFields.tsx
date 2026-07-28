// Components
import FieldError from '@components/ui/FieldError'

// Lib
import getAuthInputClassName from '../../lib/getAuthInputClassName'

// Types
import type { RegisterFieldsProps } from '../../types/register.types'

// Styles
import fieldStyles from '../../styles/auth-fields.module.scss'

const RegisterFields = ({ values, errors, onChange }: RegisterFieldsProps) => {
  return (
    <>
      <div className='flex flex-col gap-2'>
        <label htmlFor='name' className='text-[15px] font-semibold text-text-primary'>
          Full name
        </label>

        <div className={getAuthInputClassName(Boolean(errors.name))}>
          <span
            className='grid h-full basis-10.5 shrink-0 cursor-default select-none place-items-center text-base text-text-muted'
            aria-hidden='true'
          >
            ◯
          </span>

          <input
            id='name'
            name='name'
            type='text'
            value={values.name}
            onChange={onChange}
            placeholder='Alex Morgan'
            autoComplete='name'
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'register-name-error' : undefined}
            className={fieldStyles.input}
          />
        </div>

        {errors.name && <FieldError id='register-name-error' message={errors.name} />}
      </div>

      <div className='flex flex-col gap-2'>
        <label htmlFor='email' className='text-[15px] font-semibold text-text-primary'>
          Email address
        </label>

        <div className={getAuthInputClassName(Boolean(errors.email))}>
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
            value={values.email}
            onChange={onChange}
            placeholder='alex.morgan@roomly.ua'
            autoComplete='email'
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'register-email-error' : undefined}
            className={fieldStyles.input}
          />
        </div>

        {errors.email && <FieldError id='register-email-error' message={errors.email} />}
      </div>
    </>
  )
}

export default RegisterFields
