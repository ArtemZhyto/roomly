'use client'

// Modules
import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'

// API
import { logout } from '../api'

// Providers
import { useAuth } from '@providers/AuthProvider'

// Lib
import { normalizeApiError } from '@lib/api'

const useLogout = () => {
  const router = useRouter()
  const { clearUser } = useAuth()

  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [logoutError, setLogoutError] = useState<string | null>(null)

  const handleLogout = useCallback(async () => {
    if (isLoggingOut) {
      return
    }

    setIsLoggingOut(true)
    setLogoutError(null)

    try {
      await logout()
    } catch (error) {
      const apiError = normalizeApiError(error)

      if (apiError.status !== 401 && apiError.status !== 403) {
        setLogoutError(apiError.message || 'We couldn’t sign you out. Please try again.')

        setIsLoggingOut(false)

        return
      }
    }

    clearUser()

    router.replace('/login')
    router.refresh()
  }, [clearUser, isLoggingOut, router])

  return {
    isLoggingOut,
    logoutError,
    handleLogout,
  }
}

export default useLogout
