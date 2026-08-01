// Modules
import { Server } from 'socket.io'

// Types
import type { Server as HttpServer } from 'node:http'

// Configs
import { corsOptions } from '@configs/index'

// Middleware
import { authenticateSocket } from './authenticate-socket.middleware'

// Socket types
import type { SocketData } from './socket.types'

type RoomlySocketServer = Server<
  Record<string, never>,
  Record<string, never>,
  Record<string, never>,
  SocketData
>

let socketServer: RoomlySocketServer | null = null

export const getUserRoomName = (userId: number): string => {
  return `user:${userId}`
}

export const initializeSocket = (httpServer: HttpServer): RoomlySocketServer => {
  socketServer = new Server(httpServer, {
    cors: {
      origin: corsOptions.origin,
      credentials: true,
    },
  })

  socketServer.use(authenticateSocket)

  socketServer.on('connection', (socket) => {
    void socket.join(getUserRoomName(socket.data.user.id))
  })

  return socketServer
}

export const getSocketServer = (): RoomlySocketServer => {
  if (!socketServer) {
    throw new Error('Socket.IO is not initialized')
  }

  return socketServer
}
