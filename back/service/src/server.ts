// Modules
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { createServer } from 'node:http'

// Configs
import { appConfig, corsOptions, env, helmetOptions } from '@configs/index'

// Errors
import { errorHandler } from '@errors/index'

// Router
import router from '@routes/router'

// Sockets
import { initializeSocket } from '@sockets/socket'

// Workers
import { startNotificationsWorker } from '@workers/notifications.worker'

const app = express()
const httpServer = createServer(app)

initializeSocket(httpServer)

app.set('trust proxy', 1)

app.use(cors(corsOptions))
app.use(cookieParser(env.cookiesSecret))
app.use(helmet(helmetOptions))

app.use(
  express.json({
    limit: '10kb',
  }),
)

app.use(
  express.urlencoded({
    extended: true,
    limit: '10kb',
  }),
)

app.use('/', router)

app.use(errorHandler)

httpServer.listen(appConfig.port, () => {
  console.log(`Server started on :${appConfig.port}`)

  startNotificationsWorker()
})
