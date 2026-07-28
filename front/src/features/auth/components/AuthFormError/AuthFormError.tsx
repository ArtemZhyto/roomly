// Styles
import styles from './AuthFormError.module.scss'

interface AuthFormErrorProps {
  message: string
  className?: string
}

const AuthFormError = ({ message, className = '' }: AuthFormErrorProps) => {
  return (
    <div className={`${styles.error} ${className}`.trim()} role='alert'>
      <span className={styles.icon} aria-hidden='true'>
        !
      </span>

      <span>{message}</span>
    </div>
  )
}

export default AuthFormError
