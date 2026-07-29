// Modules
import { CalendarDays } from 'lucide-react'

// Components
import PageHeader from '@components/layout/PageHeader'
import EmptyState from '@components-ui/EmptyState'

const MyBookingsPage = () => {
  return (
    <div className='flex flex-col gap-8'>
      <PageHeader
        title='My bookings'
        description='View and manage your upcoming and past room bookings.'
      />

      <EmptyState
        icon={CalendarDays}
        title='No bookings yet'
        description='Your upcoming and past room bookings will appear here.'
      />
    </div>
  )
}

export default MyBookingsPage
