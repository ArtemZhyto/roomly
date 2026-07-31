// Modules
import { CalendarClock, History } from 'lucide-react'

// Components
import EmptyState from '@components-ui/EmptyState'

// Types
import type { MyBookingPeriod } from '../../types'

interface MyBookingsEmptyStateProps {
  period: MyBookingPeriod
}

const MyBookingsEmptyState = ({ period }: MyBookingsEmptyStateProps) => {
  const isUpcoming = period === 'upcoming'

  return (
    <EmptyState
      icon={isUpcoming ? CalendarClock : History}
      title={isUpcoming ? 'No upcoming bookings' : 'No past bookings'}
      description={
        isUpcoming
          ? 'Your future room reservations will appear here.'
          : 'Your completed room reservations will appear here.'
      }
    />
  )
}

export default MyBookingsEmptyState