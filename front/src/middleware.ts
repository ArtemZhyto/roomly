// Modules
import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_ROUTES = ['/login', '/register']

const API_URL = process.env.API_URL

if (!API_URL) {
  throw new Error('API_URL is not configured')
}

const redirectTo = (req: NextRequest, path: string): NextResponse => {
  return NextResponse.redirect(new URL(path, req.url))
}

export const proxy = async (req: NextRequest): Promise<NextResponse> => {
  const { pathname } = req.nextUrl

  const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname.startsWith(route))

  const accessToken = req.cookies.get('accessToken')?.value
  const refreshToken = req.cookies.get('refreshToken')?.value

  if (accessToken) {
    if (isPublicRoute) {
      return redirectTo(req, '/')
    }

    return NextResponse.next()
  }

  if (!refreshToken) {
    if (isPublicRoute) {
      return NextResponse.next()
    }

    return redirectTo(req, '/login')
  }

  try {
    const refreshResponse = await axios.post(`${API_URL}/auth/refresh`, undefined, {
      headers: {
        cookie: req.headers.get('cookie') ?? '',
      },
      validateStatus: () => true,
    })

    if (refreshResponse.status !== 200) {
      const response = isPublicRoute ? NextResponse.next() : redirectTo(req, '/login')

      response.cookies.delete('accessToken')
      response.cookies.delete('refreshToken')

      return response
    }

    const response = isPublicRoute ? redirectTo(req, '/') : NextResponse.redirect(req.nextUrl)

    const setCookieHeader = refreshResponse.headers['set-cookie']

    if (Array.isArray(setCookieHeader)) {
      for (const cookie of setCookieHeader) {
        response.headers.append('set-cookie', cookie)
      }
    } else if (setCookieHeader) {
      response.headers.append('set-cookie', setCookieHeader)
    }

    return response
  } catch {
    return redirectTo(req, '/error')
  }
}

export const config = {
  matcher: ['/', '/login', '/register', '/rooms/:path*', '/bookings/:path*', '/schedule/:path*'],
}
