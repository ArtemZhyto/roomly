// Modules
import type { ChangeEventHandler, ReactNode } from 'react'

// Components
import FieldError from '@components-ui/FieldError'

// Lib
import getAuthInputClassName from '../../lib/getAuthInputClassName'

// Styles
import fieldStyles from '../../styles/auth-fields.module.scss'

interface AuthPasswordFieldProps {
  id: string
  name: string
  label: ReactNode
  labelAside?: ReactNode
  value: string
  placeholder: string
  autoComplete: 'current-password' | 'new-password'

  error?: string
  errorId: string
  hint?: ReactNode
  hintId?: string

  isVisible: boolean
  onChange: ChangeEventHandler<HTMLInputElement>
  onVisibilityToggle: () => void

  minLength?: number
  maxLength?: number

  visibilityLabel?: string
  iconWidthClassName?: string
}

const AuthPasswordField = ({
  id,
  name,
  label,
  labelAside,
  value,
  placeholder,
  autoComplete,
  error,
  errorId,
  hint,
  hintId,
  isVisible,
  onChange,
  onVisibilityToggle,
  minLength,
  maxLength,
  visibilityLabel = 'password',
  iconWidthClassName = 'basis-10.5',
}: AuthPasswordFieldProps) => {
  const describedBy = error ? errorId : hint ? hintId : undefined

  const visibilityButtonLabel = isVisible ? `Hide ${visibilityLabel}` : `Show ${visibilityLabel}`

  return (
    <div className='flex min-w-0 flex-col gap-2'>
      <div className='flex items-center justify-between gap-4'>
        <label htmlFor={id} className='text-[15px] font-semibold text-text-primary'>
          {label}
        </label>

        {labelAside}
      </div>

      <div className={getAuthInputClassName(Boolean(error))}>
        <span
          className={[
            'grid h-full shrink-0 cursor-default select-none place-items-center text-base text-text-muted',
            iconWidthClassName,
          ].join(' ')}
          aria-hidden='true'
        >
          •
        </span>

        <input
          id={id}
          name={name}
          type={isVisible ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          minLength={minLength}
          maxLength={maxLength}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={[fieldStyles.input, fieldStyles.passwordInput].join(' ')}
        />

        <button
          type='button'
          className={fieldStyles.visibilityButton}
          onClick={onVisibilityToggle}
          aria-label={visibilityButtonLabel}
          aria-pressed={isVisible}
        >
          {isVisible ? 'Hide' : 'Show'}
        </button>
      </div>

      {error ? <FieldError id={errorId} message={error} /> : hint}
    </div>
  )
}

export default AuthPasswordField
