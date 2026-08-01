'use client'

// Modules
import { useCallback, useState, type ChangeEvent } from 'react'

// Lib
import { normalizeVerificationCode } from '../lib/verification'

interface UseVerificationCodeResult {
  code: string
  error?: string

  handleCodeChange: (event: ChangeEvent<HTMLInputElement>) => void

  setError: (error?: string) => void
}

const useVerificationCode = (): UseVerificationCodeResult => {
  const [code, setCode] = useState('')

  const [error, setError] = useState<string>()

  const handleCodeChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    setCode(normalizeVerificationCode(event.target.value))

    setError(undefined)
  }, [])

  return {
    code,
    error,
    handleCodeChange,
    setError,
  }
}

export default useVerificationCode
