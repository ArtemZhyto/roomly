// Constants
import { API_URL } from './auth-middleware.constants'

// Types
import type { MiddlewareCurrentUser } from './auth-middleware.types'

export const getCurrentUser = async (
  cookieHeader: string,
): Promise<MiddlewareCurrentUser | null> => {
  if (!API_URL) {
    return null
  }

  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      method: 'GET',

      headers: {
        cookie: cookieHeader,
      },

      cache: 'no-store',
    })

    if (!response.ok) {
      return null
    }

    return (await response.json()) as MiddlewareCurrentUser
  } catch {
    return null
  }
}

export const refreshAuthSession = async (cookieHeader: string): Promise<Response | null> => {
  if (!API_URL) {
    return null
  }

  try {
    return await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',

      headers: {
        cookie: cookieHeader,
      },

      cache: 'no-store',
    })
  } catch {
    return null
  }
}
