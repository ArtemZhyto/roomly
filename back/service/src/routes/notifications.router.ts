// Modules
import { Router } from 'express'

// Controllers
import { notificationsController } from '@controllers/notifications.controller'

const router = Router()

router.get('/', notificationsController.getNotifications)
router.patch('/:notificationId/read', notificationsController.markAsRead)

export default router
