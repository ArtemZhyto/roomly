// Components
import AuthPasswordField from '../AuthPasswordField'

// Types
import type { ResetPasswordFieldsProps } from '../../types/resetPassword.types'

// Styles
import styles from './ResetPasswordForm.module.scss'

const ResetPasswordFields = ({
  values,
  errors,
  isPasswordVisible,
  isConfirmPasswordVisible,
  onChange,
  onPasswordVisibilityToggle,
  onConfirmPasswordVisibilityToggle,
}: ResetPasswordFieldsProps) => {
  const passwordHint = (
    <p id='reset-password-hint' className={styles.passwordHint}>
      Use between 8 and 72 characters. Letters, numbers, and symbols are optional.
    </p>
  )

  return (
    <>
      <AuthPasswordField
        id='password'
        name='password'
        label='New password'
        value={values.password}
        placeholder='Enter a new password'
        autoComplete='new-password'
        error={errors.password}
        errorId='reset-password-error'
        hint={passwordHint}
        hintId='reset-password-hint'
        isVisible={isPasswordVisible}
        onChange={onChange}
        onVisibilityToggle={onPasswordVisibilityToggle}
        minLength={8}
        maxLength={72}
      />

      <AuthPasswordField
        id='confirmPassword'
        name='confirmPassword'
        label='Confirm new password'
        value={values.confirmPassword}
        placeholder='Repeat your new password'
        autoComplete='new-password'
        error={errors.confirmPassword}
        errorId='reset-confirm-password-error'
        isVisible={isConfirmPasswordVisible}
        onChange={onChange}
        onVisibilityToggle={onConfirmPasswordVisibilityToggle}
        minLength={8}
        maxLength={72}
        visibilityLabel='confirmed password'
      />
    </>
  )
}

export default ResetPasswordFields
