// Modules
import { Bell } from 'lucide-react'

// Components
import PageHeader from '@components/layout/PageHeader'
import EmptyState from '@components-ui/EmptyState'

const NotificationsPage = () => {
  return (
    <div className='flex flex-col gap-8'>
      <PageHeader
        title='Notifications'
        description='Updates about your bookings and upcoming meetings will appear here.'
      />

      <EmptyState
        icon={Bell}
        title='No notifications'
        description='You are all caught up. New booking reminders and updates will appear here.'
      />
    </div>
  )
}

export default NotificationsPage
