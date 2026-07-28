'use client'

// Modules
import { useState } from 'react'

const useResendResetEmail = (email?: string) => {
  const [isResending, setIsResending] = useState(false)
  const [isResent, setIsResent] = useState(false)
  const [error, setError] = useState<string>()

  const resendEmail = async () => {
    if (!email || isResending) {
      return
    }

    setIsResending(true)
    setIsResent(false)
    setError(undefined)

    try {
      // TODO: Resend the password reset email through the auth API.
      await new Promise((resolve) => setTimeout(resolve, 600))

      setIsResent(true)
    } catch {
      setError('We couldn’t resend the email. Please try again.')
    } finally {
      setIsResending(false)
    }
  }

  return {
    isResending,
    isResent,
    error,
    resendEmail,
  }
}

export default useResendResetEmail
