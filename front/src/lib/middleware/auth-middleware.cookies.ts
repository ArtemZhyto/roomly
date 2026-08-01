// Modules
import type { NextResponse } from 'next/server'

// Constants
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from './auth-middleware.constants'

export const clearAuthCookies = (response: NextResponse): void => {
  response.cookies.delete(ACCESS_TOKEN_COOKIE)
  response.cookies.delete(REFRESH_TOKEN_COOKIE)
}

export const getSetCookieHeaders = (response: Response): string[] => {
  const cookies = response.headers.getSetCookie()

  if (cookies.length > 0) {
    return cookies
  }

  const combinedHeader = response.headers.get('set-cookie')

  return combinedHeader ? [combinedHeader] : []
}

export const copySetCookieHeaders = (source: Response, target: NextResponse): void => {
  const setCookieHeaders = getSetCookieHeaders(source)

  setCookieHeaders.forEach((cookieHeader) => {
    target.headers.append('set-cookie', cookieHeader)
  })
}

export const createCookieHeader = (setCookieHeaders: string[]): string => {
  return setCookieHeaders
    .map((cookieHeader) => {
      return cookieHeader.split(';')[0]
    })
    .join('; ')
}
