// Modules
import { NextResponse, type NextRequest } from 'next/server'

export const redirectTo = (request: NextRequest, pathname: string): NextResponse => {
  return NextResponse.redirect(new URL(pathname, request.url))
}

export const matchesRoute = (pathname: string, routes: string[]): boolean => {
  return routes.some((route) => {
    return pathname === route || pathname.startsWith(`${route}/`)
  })
}
