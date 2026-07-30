// Types
import type { AuthUser } from '@features/auth/api'

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated'

export interface AuthContextValue {
  user: AuthUser | null
  status: AuthStatus
  isLoading: boolean
  isAuthenticated: boolean
  refreshUser: () => Promise<AuthUser | null>
  clearUser: () => void
}
