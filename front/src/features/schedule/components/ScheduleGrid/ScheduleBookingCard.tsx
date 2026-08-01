// Types
import type { ScheduleBooking } from '../../types'

// Constants
import { SLOT_DURATION_MINUTES } from '../../constants'

// Utils
import { formatScheduleTime, getBookingPosition } from './utils'

// Styles
import styles from './ScheduleGrid.module.scss'

interface ScheduleBookingCardProps {
  booking: ScheduleBooking
  totalMinutes: number
}

const ScheduleBookingCard = ({ booking, totalMinutes }: ScheduleBookingCardProps) => {
  const { startDate, endDate, durationMinutes, top, height } = getBookingPosition(
    booking,
    totalMinutes,
  )

  const isCompact = durationMinutes <= SLOT_DURATION_MINUTES

  const className = [
    styles.booking,
    booking.ownership === 'own' ? styles.bookingOwn : styles.bookingOther,
    isCompact ? styles.bookingCompact : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <article
      className={className}
      style={{
        top: `${top}%`,
        height: `${height}%`,
      }}
      title={[
        booking.title,
        booking.authorName,
        `${formatScheduleTime(startDate)} – ${formatScheduleTime(endDate)}`,
      ].join(' · ')}
    >
      <strong className={styles.bookingTitle}>{booking.title}</strong>

      {!isCompact && (
        <>
          <span className={styles.bookingAuthor}>{booking.authorName}</span>

          <span className={styles.bookingTime}>
            {formatScheduleTime(startDate)}
            {' – '}
            {formatScheduleTime(endDate)}
          </span>
        </>
      )}
    </article>
  )
}

export default ScheduleBookingCard
