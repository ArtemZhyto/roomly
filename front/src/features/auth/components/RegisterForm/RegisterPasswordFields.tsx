// Components
import AuthPasswordField from '../AuthPasswordField'

// Types
import type { RegisterPasswordFieldsProps } from '../../types/register.types'

const RegisterPasswordFields = ({
  values,
  errors,
  isPasswordVisible,
  isConfirmPasswordVisible,
  onChange,
  onPasswordVisibilityToggle,
  onConfirmPasswordVisibilityToggle,
}: RegisterPasswordFieldsProps) => {
  return (
    <div className='grid grid-cols-2 gap-4 max-[560px]:grid-cols-1'>
      <AuthPasswordField
        id='password'
        name='password'
        label='Password'
        value={values.password}
        placeholder='Password'
        autoComplete='new-password'
        error={errors.password}
        errorId='register-password-error'
        isVisible={isPasswordVisible}
        onChange={onChange}
        onVisibilityToggle={onPasswordVisibilityToggle}
        minLength={8}
        maxLength={72}
        iconWidthClassName='basis-9.5'
      />

      <AuthPasswordField
        id='confirmPassword'
        name='confirmPassword'
        label='Confirm password'
        value={values.confirmPassword}
        placeholder='Repeat'
        autoComplete='new-password'
        error={errors.confirmPassword}
        errorId='register-confirm-password-error'
        isVisible={isConfirmPasswordVisible}
        onChange={onChange}
        onVisibilityToggle={onConfirmPasswordVisibilityToggle}
        minLength={8}
        maxLength={72}
        visibilityLabel='confirmed password'
        iconWidthClassName='basis-9.5'
      />
    </div>
  )
}

export default RegisterPasswordFields