'use client'

// Modules
import { useEffect, useState } from 'react'

// Types
import type { VerificationStatus } from '../types/verification.types'

const useVerifyEmail = (token?: string, email?: string) => {
  const [status, setStatus] = useState<VerificationStatus>('loading')

  const [error, setError] = useState<string>()
  const [isResending, setIsResending] = useState(false)
  const [isResent, setIsResent] = useState(false)

  useEffect(() => {
    let isMounted = true

    const verifyEmail = async () => {
      setStatus('loading')
      setError(undefined)

      if (!token) {
        setStatus('error')
        setError('This verification link is missing or invalid.')
        return
      }

      try {
        // TODO: Verify email through the auth API.
        await new Promise((resolve) => setTimeout(resolve, 700))

        if (isMounted) {
          setStatus('success')
        }
      } catch {
        if (isMounted) {
          setStatus('error')
          setError('We couldn’t verify your email. The link may have expired.')
        }
      }
    }

    void verifyEmail()

    return () => {
      isMounted = false
    }
  }, [token])

  const resendVerificationEmail = async () => {
    if (!email || isResending) {
      return
    }

    setIsResending(true)
    setIsResent(false)

    try {
      // TODO: Resend verification email through the auth API.
      await new Promise((resolve) => setTimeout(resolve, 600))

      setIsResent(true)
    } catch {
      setError('We couldn’t resend the verification email. Please try again.')
    } finally {
      setIsResending(false)
    }
  }

  return {
    status,
    error,
    isResending,
    isResent,
    resendVerificationEmail,
  }
}

export default useVerifyEmail
