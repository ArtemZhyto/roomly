// Modules
import { type NextRequest, NextResponse } from 'next/server'

interface CurrentUserResponse {
  id: number
  name: string
  email: string
  emailVerifiedAt: string | null
}

const GUEST_ONLY_ROUTES = ['/login', '/register', '/forgot-password', '/reset-password']

const VERIFY_EMAIL_ROUTE = '/verify-email'
const ERROR_ROUTE = '/error'
const AUTHENTICATED_REDIRECT = '/rooms'

const API_URL = process.env.API_URL

const redirectTo = (request: NextRequest, pathname: string): NextResponse => {
  return NextResponse.redirect(new URL(pathname, request.url))
}

const matchesRoute = (pathname: string, routes: string[]): boolean => {
  return routes.some((route) => pathname === route || pathname.startsWith(`${route}/`))
}

const clearAuthCookies = (response: NextResponse): void => {
  response.cookies.delete('accessToken')
  response.cookies.delete('refreshToken')
}

const getSetCookieHeaders = (response: Response): string[] => {
  const headers = response.headers as Headers & {
    getSetCookie?: () => string[]
  }

  const cookies = headers.getSetCookie?.()

  if (cookies?.length) {
    return cookies
  }

  const combinedHeader = response.headers.get('set-cookie')

  return combinedHeader ? [combinedHeader] : []
}

const copySetCookieHeaders = (source: Response, target: NextResponse): void => {
  getSetCookieHeaders(source).forEach((cookie) => {
    target.headers.append('set-cookie', cookie)
  })
}

const createCookieHeader = (setCookieHeaders: string[]): string => {
  return setCookieHeaders.map((cookie) => cookie.split(';')[0]).join('; ')
}

const getCurrentUser = async (cookieHeader: string): Promise<CurrentUserResponse | null> => {
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

    return await response.json()
  } catch {
    return null
  }
}

const handleVerifyEmailRoute = async (
  request: NextRequest,
  cookieHeader: string,
): Promise<NextResponse> => {
  const user = await getCurrentUser(cookieHeader)

  if (!user) {
    return redirectTo(request, '/login')
  }

  return user.emailVerifiedAt ? redirectTo(request, AUTHENTICATED_REDIRECT) : NextResponse.next()
}

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl

  if (pathname === ERROR_ROUTE) {
    return NextResponse.next()
  }

  if (!API_URL) {
    return redirectTo(request, ERROR_ROUTE)
  }

  const isGuestOnlyRoute = matchesRoute(pathname, GUEST_ONLY_ROUTES)

  const isVerifyEmailRoute =
    pathname === VERIFY_EMAIL_ROUTE || pathname.startsWith(`${VERIFY_EMAIL_ROUTE}/`)

  const accessToken = request.cookies.get('accessToken')?.value

  const refreshToken = request.cookies.get('refreshToken')?.value

  const requestCookieHeader = request.headers.get('cookie') ?? ''

  if (accessToken) {
    if (isGuestOnlyRoute) {
      return redirectTo(request, AUTHENTICATED_REDIRECT)
    }

    if (isVerifyEmailRoute) {
      return handleVerifyEmailRoute(request, requestCookieHeader)
    }

    return NextResponse.next()
  }

  if (!refreshToken) {
    if (isGuestOnlyRoute) {
      return NextResponse.next()
    }

    return redirectTo(request, '/login')
  }

  try {
    const refreshResponse = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        cookie: requestCookieHeader,
      },
      cache: 'no-store',
    })

    if (!refreshResponse.ok) {
      const response = isGuestOnlyRoute ? NextResponse.next() : redirectTo(request, '/login')

      clearAuthCookies(response)

      return response
    }

    const setCookieHeaders = getSetCookieHeaders(refreshResponse)

    if (isVerifyEmailRoute) {
      const refreshedCookieHeader = createCookieHeader(setCookieHeaders)

      const user = await getCurrentUser(refreshedCookieHeader)

      const response = user?.emailVerifiedAt
        ? redirectTo(request, AUTHENTICATED_REDIRECT)
        : user
          ? NextResponse.next()
          : redirectTo(request, '/login')

      copySetCookieHeaders(refreshResponse, response)

      return response
    }

    const response = isGuestOnlyRoute
      ? redirectTo(request, AUTHENTICATED_REDIRECT)
      : NextResponse.next()

    copySetCookieHeaders(refreshResponse, response)

    return response
  } catch {
    return redirectTo(request, ERROR_ROUTE)
  }
}

export const config = {
  matcher: [
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/verify-email',
    '/error',
    '/dashboard/:path*',
    '/my-bookings/:path*',
    '/notifications/:path*',
    '/rooms/:path*',
    '/schedule/:path*',
    '/settings/:path*',
  ],
}
