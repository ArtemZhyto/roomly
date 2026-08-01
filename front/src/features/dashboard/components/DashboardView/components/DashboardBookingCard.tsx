// Modules
import Link from 'next/link'

import { ArrowRight, CalendarDays, Clock3, DoorOpen, MapPin } from 'lucide-react'

// Features
import type { UserBooking } from '@features/booking'

// Local components
import DashboardCardHeader from './DashboardCardHeader'

// Utils
import {
  formatDashboardBookingDate,
  formatDashboardBookingTimeRange,
  getDashboardBookingDateValue,
} from '../dashboard-date.utils'

// Styles
import styles from '../DashboardView.module.scss'

interface DashboardBookingCardProps {
  booking: UserBooking
}

const DashboardBookingCard = ({ booking }: DashboardBookingCardProps) => {
  const scheduleHref = [
    `/schedule?room=${booking.roomId}`,

    `date=${getDashboardBookingDateValue(booking.startTime)}`,
  ].join('&')

  return (
    <article className={styles.bookingCard}>
      <DashboardCardHeader icon={DoorOpen} status='Upcoming' statusVariant='upcoming' />

      <div className={styles.content}>
        <h3 className={styles.bookingTitle}>{booking.title}</h3>

        <div className={styles.details}>
          <div className={styles.detail}>
            <CalendarDays size={17} strokeWidth={2} aria-hidden='true' />

            <span>{formatDashboardBookingDate(booking.startTime)}</span>
          </div>

          <div className={styles.detail}>
            <Clock3 size={17} strokeWidth={2} aria-hidden='true' />

            <span>{formatDashboardBookingTimeRange(booking.startTime, booking.endTime)}</span>
          </div>

          <div className={styles.detail}>
            <DoorOpen size={17} strokeWidth={2} aria-hidden='true' />

            <span>{booking.room.name}</span>
          </div>

          <div className={styles.detail}>
            <MapPin size={17} strokeWidth={2} aria-hidden='true' />

            <span>Floor {booking.room.floor}</span>
          </div>
        </div>
      </div>

      <Link href={scheduleHref} className={styles.action}>
        View schedule
        <ArrowRight className={styles.actionIcon} size={17} strokeWidth={2} aria-hidden='true' />
      </Link>
    </article>
  )
}

export default DashboardBookingCard
