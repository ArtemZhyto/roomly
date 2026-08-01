// Services
import { processDueNotifications } from '@services/notifications'

const NOTIFICATION_CHECK_INTERVAL_MS = 15_000

let worker: NodeJS.Timeout | null = null

const runNotificationCheck = async (): Promise<void> => {
  try {
    await processDueNotifications()
  } catch (error: unknown) {
    console.error('Notification worker failed:', error)
  }
}

export const startNotificationsWorker = (): void => {
  if (worker) {
    return
  }

  void runNotificationCheck()

  worker = setInterval(() => {
    void runNotificationCheck()
  }, NOTIFICATION_CHECK_INTERVAL_MS)

  console.log('Notification worker started')
}
