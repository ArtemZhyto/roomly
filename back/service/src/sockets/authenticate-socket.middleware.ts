// Modules
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import { parse } from 'cookie'

// Types
import type { ExtendedError } from 'socket.io'
import type { Socket } from 'socket.io'

// Configs
import { env } from '@configs/index'

// Interfaces
import type { Payload } from '@services/auth'

// Socket types
import type { SocketData } from './socket.types'

type AuthenticatedSocket = Socket<
  Record<string, never>,
  Record<string, never>,
  Record<string, never>,
  SocketData
>

const getSignedAccessToken = (socket: AuthenticatedSocket): string | null => {
  const rawCookies = socket.handshake.headers.cookie

  if (!rawCookies) {
    return null
  }

  const cookies = parse(rawCookies)
  const signedAccessToken = cookies.accessToken

  return typeof signedAccessToken === 'string' ? signedAccessToken : null
}

const unsignAccessToken = (signedAccessToken: string): string | null => {
  const accessToken = cookieParser.signedCookie(signedAccessToken, env.cookiesSecret)

  return typeof accessToken === 'string' ? accessToken : null
}

const verifyAccessToken = (accessToken: string): Payload => {
  return jwt.verify(accessToken, env.accessSecret) as Payload
}

export const authenticateSocket = (
  socket: AuthenticatedSocket,
  next: (error?: ExtendedError) => void,
): void => {
  try {
    const signedAccessToken = getSignedAccessToken(socket)

    if (!signedAccessToken) {
      next(new Error('Unauthorized'))

      return
    }

    const accessToken = unsignAccessToken(signedAccessToken)

    if (!accessToken) {
      next(new Error('Unauthorized'))

      return
    }

    socket.data.user = verifyAccessToken(accessToken)

    next()
  } catch {
    next(new Error('Unauthorized'))
  }
}
