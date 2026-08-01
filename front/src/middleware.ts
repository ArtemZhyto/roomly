// Modules
import { NextResponse, type NextRequest } from 'next/server'

// Middleware API
import { getCurrentUser, refreshAuthSession } from '@lib/middleware/auth-middleware.api'

// Constants
import {
  ACCESS_TOKEN_COOKIE,
  API_URL,
  AUTHENTICATED_REDIRECT,
  ERROR_ROUTE,
  GUEST_ONLY_ROUTES,
  LOGIN_ROUTE,
  REFRESH_TOKEN_COOKIE,
  VERIFY_EMAIL_ROUTE,
} from '@lib/middleware/auth-middleware.constants'

// Cookies
import {
  clearAuthCookies,
  copySetCookieHeaders,
  createCookieHeader,
  getSetCookieHeaders,
} from '@lib/middleware/auth-middleware.cookies'

// Routes
import { matchesRoute, redirectTo } from '@lib/middleware/auth-middleware.routes'

const handleVerifyEmailRoute = async (
  request: NextRequest,
  cookieHeader: string,
): Promise<NextResponse> => {
  const user = await getCurrentUser(cookieHeader)

  if (!user) {
    return redirectTo(request, LOGIN_ROUTE)
  }

  if (user.emailVerifiedAt) {
    return redirectTo(request, AUTHENTICATED_REDIRECT)
  }

  return NextResponse.next()
}

const handleFailedRefresh = (request: NextRequest, isGuestOnlyRoute: boolean): NextResponse => {
  const response = isGuestOnlyRoute ? NextResponse.next() : redirectTo(request, LOGIN_ROUTE)

  clearAuthCookies(response)

  return response
}

const handleVerifiedUserAfterRefresh = async (
  request: NextRequest,
  refreshResponse: Response,
): Promise<NextResponse> => {
  const setCookieHeaders = getSetCookieHeaders(refreshResponse)

  const refreshedCookieHeader = createCookieHeader(setCookieHeaders)

  const user = await getCurrentUser(refreshedCookieHeader)

  let response: NextResponse

  if (!user) {
    response = redirectTo(request, LOGIN_ROUTE)
  } else if (user.emailVerifiedAt) {
    response = redirectTo(request, AUTHENTICATED_REDIRECT)
  } else {
    response = NextResponse.next()
  }

  copySetCookieHeaders(refreshResponse, response)

  return response
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
  const isVerifyEmailRoute = matchesRoute(pathname, [VERIFY_EMAIL_ROUTE])

  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value

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

    return redirectTo(request, LOGIN_ROUTE)
  }

  const refreshResponse = await refreshAuthSession(requestCookieHeader)

  if (!refreshResponse) {
    return redirectTo(request, ERROR_ROUTE)
  }

  if (!refreshResponse.ok) {
    return handleFailedRefresh(request, isGuestOnlyRoute)
  }

  if (isVerifyEmailRoute) {
    return handleVerifiedUserAfterRefresh(request, refreshResponse)
  }

  const response = isGuestOnlyRoute
    ? redirectTo(request, AUTHENTICATED_REDIRECT)
    : NextResponse.next()

  copySetCookieHeaders(refreshResponse, response)

  return response
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
