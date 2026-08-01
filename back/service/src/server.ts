// Modules
import { createServer } from 'node:http'

// App
import app from './app'

// Configs
import { appConfig } from '@configs/index'

// Sockets
import { initializeSocket } from '@sockets/socket'

// Workers
import { startNotificationsWorker } from '@workers/notifications.worker'

const httpServer = createServer(app)

initializeSocket(httpServer)

httpServer.listen(appConfig.port, () => {
  console.log(`Server started on :${appConfig.port}`)

  startNotificationsWorker()
})
