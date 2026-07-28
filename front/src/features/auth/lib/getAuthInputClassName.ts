// Styles
import styles from '../styles/auth-fields.module.scss'

const getAuthInputClassName = (hasError: boolean) => {
  return [styles.inputWrapper, hasError ? styles.inputWrapperError : ''].filter(Boolean).join(' ')
}

export default getAuthInputClassName
