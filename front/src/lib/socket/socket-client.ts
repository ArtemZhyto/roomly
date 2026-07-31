// Modules
import { io, type Socket } from 'socket.io-client'

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL

if (!SOCKET_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not configured')
}

let socket: Socket | null = null

export const getSocketClient = (): Socket => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      withCredentials: true,
      autoConnect: false,
      transports: ['websocket', 'polling'],
    })
  }

  return socket
}
