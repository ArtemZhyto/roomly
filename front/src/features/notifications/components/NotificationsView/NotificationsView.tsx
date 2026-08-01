'use client'

// Modules
import { Bell } from 'lucide-react'

// Components
import PageHeader from '@components/layout/PageHeader'
import EmptyState from '@components-ui/EmptyState'

// Local components
import NotificationsErrorState from './NotificationsErrorState'
import NotificationsList from './NotificationsList'
import NotificationsLoadingState from './NotificationsLoadingState'
import NotificationsToolbar from './NotificationsToolbar'

// Hooks
import useNotifications from '../../hooks/useNotifications'

// Styles
import styles from './NotificationsView.module.scss'

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

  const handleRetry = (): void => {
    void retry()
  }

  const handleMarkAsRead = (notificationId: number): void => {
    void markAsRead(notificationId)
  }

  const handleMarkAllAsRead = (): void => {
    void markAllAsRead()
  }

  const handleRemove = (notificationId: number): void => {
    void removeNotification(notificationId)
  }

  const handleClearAll = (): void => {
    void clearNotifications()
  }

  const renderContent = () => {
    if (isLoading) {
      return <NotificationsLoadingState />
    }

    if (errorMessage) {
      return <NotificationsErrorState message={errorMessage} onRetry={handleRetry} />
    }

    if (notifications.length === 0) {
      return (
        <EmptyState
          icon={Bell}
          title='No notifications'
          description='You are all caught up. New booking reminders and updates will appear here.'
        />
      )
    }

    return (
      <section className={styles.section}>
        <NotificationsToolbar
          unreadCount={unreadCount}
          onMarkAllAsRead={handleMarkAllAsRead}
          onClearAll={handleClearAll}
        />

        <NotificationsList
          notifications={notifications}
          onMarkAsRead={handleMarkAsRead}
          onRemove={handleRemove}
        />
      </section>
    )
  }

  return (
    <div className={styles.page}>
      <PageHeader
        title='Notifications'
        description='Updates about your bookings and upcoming meetings will appear here.'
      />

      {renderContent()}
    </div>
  )
}

export default NotificationsView
