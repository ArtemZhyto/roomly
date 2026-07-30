// Modules
import { CalendarClock, History } from 'lucide-react'

// Types
import type { MyBookingPeriod } from '../../types'

// Styles
import styles from './MyBookingsView.module.scss'

interface MyBookingsEmptyStateProps {
  period: MyBookingPeriod
}

const MyBookingsEmptyState = ({ period }: MyBookingsEmptyStateProps) => {
  const isUpcoming = period === 'upcoming'

  const Icon = isUpcoming ? CalendarClock : History

  return (
    <div className={styles.emptyState}>
      <div className={styles.stateIcon}>
        <Icon size={24} strokeWidth={2} aria-hidden='true' />
      </div>

      <h2 className={styles.stateTitle}>
        {isUpcoming ? 'No upcoming bookings' : 'No past bookings'}
      </h2>

      <p className={styles.stateDescription}>
        {isUpcoming
          ? 'Your future room reservations will appear here.'
          : 'Your completed room reservations will appear here.'}
      </p>
    </div>
  )
}

export default MyBookingsEmptyState
