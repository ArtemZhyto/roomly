// Modules
import { Router } from 'express'

// Controllers
import {
  deleteAllNotificationsController,
  deleteNotificationController,
  getNotificationsController,
  markAllNotificationsReadController,
  markNotificationReadController,
} from '@controllers/notifications'

const router = Router()

router.get('/', getNotificationsController)

router.patch('/read-all', markAllNotificationsReadController)
router.patch('/:notificationId/read', markNotificationReadController)

router.delete('/', deleteAllNotificationsController)
router.delete('/:notificationId', deleteNotificationController)

export default router
