'use client'

// Modules
import axios from 'axios'
import { type ReactNode, useCallback, useEffect, useMemo, useState } from 'react'

// API
import { getCurrentUser } from '@features/auth/api'

// Context
import AuthContext from './auth-context'

// Types
import type { AuthUser } from '@features/auth/api'
import type { AuthContextValue, AuthStatus } from './auth.types'

interface AuthProviderProps {
  children: ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [status, setStatus] = useState<AuthStatus>('loading')

  const clearUser = useCallback(() => {
    setUser(null)
    setStatus('unauthenticated')
  }, [])

  const refreshUser = useCallback(async (): Promise<AuthUser | null> => {
    setStatus('loading')

    try {
      const currentUser = await getCurrentUser()

      setUser(currentUser)
      setStatus('authenticated')

      return currentUser
    } catch (error) {
      setUser(null)

      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setStatus('unauthenticated')

        return null
      }

      setStatus('error')

      return null
    }
  }, [])

  useEffect(() => {
    void refreshUser()
  }, [refreshUser])

  const contextValue = useMemo<AuthContextValue>(
    () => ({
      user,
      status,
      isLoading: status === 'loading',
      isAuthenticated: status === 'authenticated',
      refreshUser,
      clearUser,
    }),
    [clearUser, refreshUser, status, user],
  )

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export default AuthProvider
