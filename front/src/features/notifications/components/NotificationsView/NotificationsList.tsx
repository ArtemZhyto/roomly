// Types
import type { AppNotification } from '../../types/notification.types'

// Local components
import NotificationItem from './NotificationItem'

// Styles
import styles from './NotificationsView.module.scss'

interface NotificationsListProps {
  notifications: AppNotification[]
  onMarkAsRead: (notificationId: number) => void
  onRemove: (notificationId: number) => void
}

const NotificationsList = ({ notifications, onMarkAsRead, onRemove }: NotificationsListProps) => {
  return (
    <div className={styles.list}>
      {notifications.map((notification) => {
        return (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onMarkAsRead={onMarkAsRead}
            onRemove={onRemove}
          />
        )
      })}
    </div>
  )
}

export default NotificationsList
