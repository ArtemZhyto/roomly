// Styles
import styles from './AuthSubmitButton.module.scss'

interface AuthSubmitButtonProps {
  label: string
  loadingLabel: string
  isLoading: boolean
  disabled?: boolean
  type?: 'submit' | 'button'
  onClick?: () => void
}

const AuthSubmitButton = ({
  label,
  loadingLabel,
  isLoading,
  disabled = false,
  type = 'submit',
  onClick,
}: AuthSubmitButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${styles.button} inline-flex min-h-13 w-full cursor-pointer items-center justify-center gap-2.5 rounded-[10px] border px-5 text-base font-semibold`}
    >
      {isLoading && (
        <span
          className={`${styles.spinner} size-4.25 shrink-0 rounded-full border-2`}
          aria-hidden='true'
        />
      )}

      <span className='cursor-default select-none'>{isLoading ? loadingLabel : label}</span>
    </button>
  )
}

export default AuthSubmitButton
