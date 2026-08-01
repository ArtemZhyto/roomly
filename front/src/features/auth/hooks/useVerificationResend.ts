'use client'

// Modules
import { useCallback, useState } from 'react'

// API
import { resendVerification } from '../api'

// Hooks
import useCooldown from './useCooldown'

// Lib
import {
  DEFAULT_RESEND_COOLDOWN_SECONDS,
  DEFAULT_RESEND_VERIFICATION_ERROR,
  getVerificationCooldown,
} from '../lib/verification'

// API error
import { normalizeApiError } from '@lib/api'

interface UseVerificationResendOptions {
  setError: (error?: string) => void
}

interface UseVerificationResendResult {
  isResending: boolean
  isResent: boolean
  cooldown: number
  resendVerificationEmail: () => Promise<void>
}

const useVerificationResend = ({
  setError,
}: UseVerificationResendOptions): UseVerificationResendResult => {
  const [isResending, setIsResending] = useState(false)
  const [isResent, setIsResent] = useState(false)

  const { cooldown, isCoolingDown, startCooldown } = useCooldown(DEFAULT_RESEND_COOLDOWN_SECONDS)

  const resendVerificationEmail = useCallback(async (): Promise<void> => {
    if (isResending || isCoolingDown) {
      return
    }

    setIsResending(true)
    setIsResent(false)
    setError(undefined)

    try {
      await resendVerification()

      setIsResent(true)

      startCooldown(DEFAULT_RESEND_COOLDOWN_SECONDS)
    } catch (requestError: unknown) {
      const apiError = normalizeApiError(requestError)

      const serverCooldown = getVerificationCooldown(apiError.message)

      if (serverCooldown !== null) {
        startCooldown(serverCooldown)

        return
      }

      setError(apiError.message || DEFAULT_RESEND_VERIFICATION_ERROR)
    } finally {
      setIsResending(false)
    }
  }, [isCoolingDown, isResending, setError, startCooldown])

  return {
    isResending,
    isResent,
    cooldown,
    resendVerificationEmail,
  }
}

export default useVerificationResend
