// Modules
import { Router } from 'express'

// Controllers
import { notificationsController } from '@controllers/notifications.controller'

const router = Router()

router.get('/', notificationsController.getNotifications)
router.patch('/read-all', notificationsController.markAllAsRead)
router.patch('/:notificationId/read', notificationsController.markAsRead)
router.delete('/', notificationsController.deleteAllNotifications)
router.delete('/:notificationId', notificationsController.deleteNotification)

export default router
