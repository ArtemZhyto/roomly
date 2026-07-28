// Styles
import styles from './FieldError.module.scss'

interface FieldErrorProps {
  id: string
  message: string
}

const FieldError = ({ id, message }: FieldErrorProps) => {
  return (
    <p id={id} className={styles.error} role='alert'>
      <span className={styles.icon} aria-hidden='true'>
        !
      </span>

      <span>{message}</span>
    </p>
  )
}

export default FieldError
