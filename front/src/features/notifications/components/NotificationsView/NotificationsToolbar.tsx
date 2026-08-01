// Modules
import { CheckCheck, Trash2 } from 'lucide-react'

// Styles
import styles from './NotificationsView.module.scss'

interface NotificationsToolbarProps {
  unreadCount: number
  onMarkAllAsRead: () => void
  onClearAll: () => void
}

const NotificationsToolbar = ({
  unreadCount,
  onMarkAllAsRead,
  onClearAll,
}: NotificationsToolbarProps) => {
  return (
    <div className={styles.toolbar}>
      <div>
        <h2 className={styles.heading}>Recent notifications</h2>

        <p className={styles.count}>
          {unreadCount === 0 ? 'Everything is read' : `${unreadCount} unread`}
        </p>
      </div>

      <div className={styles.toolbarActions}>
        {unreadCount > 0 && (
          <button type='button' className={styles.secondaryButton} onClick={onMarkAllAsRead}>
            <CheckCheck size={17} strokeWidth={2} aria-hidden='true' />
            Mark all as read
          </button>
        )}

        <button type='button' className={styles.clearButton} onClick={onClearAll}>
          <Trash2 size={17} strokeWidth={2} aria-hidden='true' />
          Clear all
        </button>
      </div>
    </div>
  )
}

export default NotificationsToolbar
