// Modules
import Link from 'next/link'

import { ArrowRight, CalendarDays } from 'lucide-react'

// Components
import EmptyState from '@components-ui/EmptyState'

// Features
import type { UserBooking } from '@features/booking'

// Local components
import DashboardBookingCard from './DashboardBookingCard'

// Styles
import styles from '../DashboardView.module.scss'

interface DashboardBookingsSectionProps {
  bookings: UserBooking[]
}

const DashboardBookingsSection = ({ bookings }: DashboardBookingsSectionProps) => {
  if (bookings.length === 0) {
    const browseRoomsAction = (
      <Link href='/rooms' className={styles.primaryAction}>
        Browse rooms
        <ArrowRight size={17} strokeWidth={2} aria-hidden='true' />
      </Link>
    )

    return (
      <EmptyState
        icon={CalendarDays}
        title='No upcoming bookings'
        description='Your future room reservations will appear here.'
        action={browseRoomsAction}
      />
    )
  }

  return (
    <section className={styles.bookingsSection}>
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.sectionTitle}>Upcoming bookings</h2>

          <p className={styles.sectionDescription}>Your nearest room reservations.</p>
        </div>

        <Link href='/my-bookings' className={styles.sectionLink}>
          View all
          <ArrowRight size={16} strokeWidth={2} aria-hidden='true' />
        </Link>
      </div>

      <div className={styles.bookingsGrid}>
        {bookings.map((booking) => {
          return <DashboardBookingCard key={booking.id} booking={booking} />
        })}
      </div>
    </section>
  )
}

export default DashboardBookingsSection
