'use client'

// Modules
import { createContext } from 'react'

// Types
import type { AuthContextValue } from './auth.types'

const AuthContext = createContext<AuthContextValue | null>(null)

export default AuthContext
