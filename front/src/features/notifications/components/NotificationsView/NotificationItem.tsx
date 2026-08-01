// Modules
import { Bell, X } from 'lucide-react'

// Types
import type { AppNotification } from '../../types/notification.types'

// Styles
import styles from './NotificationsView.module.scss'

interface NotificationItemProps {
  notification: AppNotification
  onMarkAsRead: (notificationId: number) => void
  onRemove: (notificationId: number) => void
}

const formatNotificationDate = (value: string): string => {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

const NotificationItem = ({ notification, onMarkAsRead, onRemove }: NotificationItemProps) => {
  const notificationClassName = [styles.notification, !notification.isRead ? styles.unread : '']
    .filter(Boolean)
    .join(' ')

  const iconClassName = [styles.notificationIcon, styles[`notificationIcon-${notification.type}`]]
    .filter(Boolean)
    .join(' ')

  return (
    <article className={notificationClassName}>
      <button
        type='button'
        className={styles.notificationContent}
        onClick={() => {
          onMarkAsRead(notification.id)
        }}
      >
        <span className={iconClassName}>
          <Bell size={19} strokeWidth={2} aria-hidden='true' />
        </span>

        <span className={styles.details}>
          <span className={styles.titleRow}>
            <strong>{notification.title}</strong>

            {!notification.isRead && <span className={styles.unreadDot} aria-label='Unread' />}
          </span>

          <span className={styles.message}>{notification.message}</span>

          <time className={styles.time} dateTime={notification.createdAt}>
            {formatNotificationDate(notification.createdAt)}
          </time>
        </span>
      </button>

      <button
        type='button'
        className={styles.removeButton}
        aria-label={`Remove ${notification.title}`}
        onClick={() => {
          onRemove(notification.id)
        }}
      >
        <X size={17} strokeWidth={2} aria-hidden='true' />
      </button>
    </article>
  )
}

export default NotificationItem
