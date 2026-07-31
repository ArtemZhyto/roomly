'use client'

// Modules
import { Bell, CheckCheck, Trash2, X } from 'lucide-react'

// Components
import PageHeader from '@components/layout/PageHeader'
import EmptyState from '@components-ui/EmptyState'

// Local components
import NotificationsErrorState from './NotificationsErrorState'

// Hooks
import useNotifications from '../../hooks/useNotifications'

// Styles
import styles from './NotificationsView.module.scss'

const formatNotificationDate = (value: string): string => {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

const NotificationsView = () => {
  const {
    notifications,
    unreadCount,
    isLoading,
    errorMessage,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearNotifications,
    retry,
  } = useNotifications()

  return (
    <div className={styles.page}>
      <PageHeader
        title='Notifications'
        description='Updates about your bookings and upcoming meetings will appear here.'
      />

      {isLoading ? (
        <div
          className='min-h-72 animate-pulse rounded-card border border-border bg-surface-secondary shadow-card'
          role='status'
          aria-label='Loading notifications'
        >
          <span className='sr-only'>Loading notifications...</span>
        </div>
      ) : errorMessage ? (
        <NotificationsErrorState
          message={errorMessage}
          onRetry={() => {
            void retry()
          }}
        />
      ) : notifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title='No notifications'
          description='You are all caught up. New booking reminders and updates will appear here.'
        />
      ) : (
        <section className={styles.section}>
          <div className={styles.toolbar}>
            <div>
              <h2 className={styles.heading}>Recent notifications</h2>

              <p className={styles.count}>
                {unreadCount === 0 ? 'Everything is read' : `${unreadCount} unread`}
              </p>
            </div>

            <div className={styles.toolbarActions}>
              {unreadCount > 0 && (
                <button
                  type='button'
                  className={styles.secondaryButton}
                  onClick={() => {
                    void markAllAsRead()
                  }}
                >
                  <CheckCheck size={17} strokeWidth={2} aria-hidden='true' />
                  Mark all as read
                </button>
              )}

              <button
                type='button'
                className={styles.clearButton}
                onClick={() => {
                  void clearNotifications()
                }}
              >
                <Trash2 size={17} strokeWidth={2} aria-hidden='true' />
                Clear all
              </button>
            </div>
          </div>

          <div className={styles.list}>
            {notifications.map((notification) => (
              <article
                key={notification.id}
                className={[styles.notification, !notification.isRead ? styles.unread : '']
                  .filter(Boolean)
                  .join(' ')}
              >
                <button
                  type='button'
                  className={styles.notificationContent}
                  onClick={() => {
                    void markAsRead(notification.id)
                  }}
                >
                  <span
                    className={[
                      styles.notificationIcon,
                      styles[`notificationIcon-${notification.type}`],
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    <Bell size={19} strokeWidth={2} aria-hidden='true' />
                  </span>

                  <span className={styles.details}>
                    <span className={styles.titleRow}>
                      <strong>{notification.title}</strong>

                      {!notification.isRead && (
                        <span className={styles.unreadDot} aria-label='Unread' />
                      )}
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
                    void removeNotification(notification.id)
                  }}
                >
                  <X size={17} strokeWidth={2} aria-hidden='true' />
                </button>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default NotificationsView
