// Services
import { deleteAllNotifications, deleteNotification } from './delete-notifications.service'

import { getUserNotifications } from './get-notifications.service'

import {
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from './mark-notifications-read.service'

import { processDueNotifications } from './process-due-notifications.service'

export const notificationsService = {
  processDueNotifications,
  getUserNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  deleteAllNotifications,
}

export {
  deleteAllNotifications,
  deleteNotification,
  getUserNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
  processDueNotifications,
}
