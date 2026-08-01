'use client'

// Modules
import { useCallback, useState, type ChangeEvent } from 'react'

// Lib
import { INITIAL_REGISTER_VALUES } from '../lib/register'

// Types
import type { RegisterErrors, RegisterValues } from '../types/register.types'

interface UseRegisterFormStateResult {
  values: RegisterValues
  errors: RegisterErrors

  handleChange: (event: ChangeEvent<HTMLInputElement>) => void

  setErrors: (errors: RegisterErrors) => void

  clearErrors: () => void
}

const useRegisterFormState = (): UseRegisterFormStateResult => {
  const [values, setValues] = useState<RegisterValues>(INITIAL_REGISTER_VALUES)
  const [errors, setErrors] = useState<RegisterErrors>({})

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = event.target

    setValues((currentValues) => {
      return {
        ...currentValues,

        [name]: type === 'checkbox' ? checked : value,
      }
    })

    setErrors((currentErrors) => {
      return {
        ...currentErrors,
        [name]: undefined,
        form: undefined,
      }
    })
  }, [])

  const clearErrors = useCallback((): void => {
    setErrors({})
  }, [])

  return {
    values,
    errors,
    handleChange,
    setErrors,
    clearErrors,
  }
}

export default useRegisterFormState
