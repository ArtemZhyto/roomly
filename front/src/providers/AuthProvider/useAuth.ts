'use client'

// Modules
import { useContext } from 'react'

// Context
import AuthContext from './auth-context'

const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}

export default useAuth
