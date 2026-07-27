// Configs
import { __PORT, __CORS_OPTIONS, __HELMET_OPTIONS, __IS_PROD } from '@configs/config'

// Modules
import express, { NextFunction, Request, Response } from 'express'
import { createServer } from 'node:http'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'

// Router
import router from '@routes/router'

// Sockets
import { initializeSocket } from '@sockets/socket'

// Workers
import { startNotificationsWorker } from '@workers/notifications.worker'

const app = express()
const httpServer = createServer(app)

const COOKIES_SECRET = process.env.COOKIES_SECRET

if (!COOKIES_SECRET) {
  throw new Error('COOKIES_SECRET is not configured')
}

initializeSocket(httpServer)

app.set('trust proxy', 1)
app.use(cors(__CORS_OPTIONS))
app.use(cookieParser(COOKIES_SECRET))
app.use(helmet(__HELMET_OPTIONS))
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))

app.use('/', router)

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack)

  res.status(500).json({
    message: 'Internal Server Error',
    ...(!__IS_PROD && {
      error: err.message,
    }),
  })
})

startNotificationsWorker()

httpServer.listen(__PORT, () => {
  console.log(`Server started on :${__PORT}`)
})
