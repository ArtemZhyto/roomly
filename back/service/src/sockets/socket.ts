// Configs
import { __CORS_OPTIONS } from '@configs/config'

// Modules
import { Server } from 'socket.io'
import { parse } from 'cookie'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import type { Server as HttpServer } from 'node:http'

// Interfaces
import { Payload } from '@ts/interfaces/auth'

const COOKIES_SECRET = process.env.COOKIES_SECRET
const ACCESS_SECRET = process.env.ACCESS_SECRET

if (!COOKIES_SECRET) {
  throw new Error('COOKIES_SECRET is not configured')
}

if (!ACCESS_SECRET) {
  throw new Error('ACCESS_SECRET is not configured')
}

let io: Server | null = null

export const initializeSocket = (httpServer: HttpServer): Server => {
  io = new Server(httpServer, {
    cors: {
      origin: __CORS_OPTIONS.origin,
      credentials: true,
    },
  })

  io.use((socket, next) => {
    try {
      const rawCookies = socket.handshake.headers.cookie

      if (!rawCookies) {
        return next(new Error('Unauthorized'))
      }

      const cookies = parse(rawCookies)
      const signedAccessToken = cookies.accessToken

      if (!signedAccessToken) {
        return next(new Error('Unauthorized'))
      }

      const accessToken = cookieParser.signedCookie(signedAccessToken, COOKIES_SECRET)

      if (!accessToken || typeof accessToken !== 'string') {
        return next(new Error('Unauthorized'))
      }

      const payload = jwt.verify(accessToken, ACCESS_SECRET) as Payload

      socket.data.user = payload

      next()
    } catch {
      next(new Error('Unauthorized'))
    }
  })

  io.on('connection', (socket) => {
    const user = socket.data.user as Payload

    socket.join(`user:${user.id}`)
  })

  return io
}

export const getSocketServer = (): Server => {
  if (!io) {
    throw new Error('Socket.IO is not initialized')
  }

  return io
}
