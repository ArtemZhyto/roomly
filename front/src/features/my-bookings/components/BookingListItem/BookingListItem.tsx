// Modules
import { CalendarDays, Clock3, DoorOpen, MapPin, Trash2 } from 'lucide-react'

// Types
import type { MyBooking } from '../../types'

// Utils
import { formatBookingDate, formatBookingTimeRange } from '../../utils'

// Styles
import styles from './BookingListItem.module.scss'

interface BookingListItemProps {
  booking: MyBooking
  onOpen: (booking: MyBooking) => void
  onCancel?: (booking: MyBooking) => void
}

const BookingListItem = ({ booking, onOpen, onCancel }: BookingListItemProps) => {
  const isUpcoming = booking.period === 'upcoming'

  return (
    <article className={styles.card}>
      <button
        type='button'
        className={styles.content}
        aria-label={`Open ${booking.title} in ${booking.roomName}`}
        onClick={() => {
          onOpen(booking)
        }}
      >
        <div className={styles.roomIcon}>
          <DoorOpen size={22} strokeWidth={2} aria-hidden='true' />
        </div>

        <div className={styles.details}>
          <div className={styles.heading}>
            <h2 className={styles.title}>{booking.title}</h2>

            <span
              className={[styles.status, isUpcoming ? styles.statusUpcoming : styles.statusPast]
                .filter(Boolean)
                .join(' ')}
            >
              {isUpcoming ? 'Upcoming' : 'Past'}
            </span>
          </div>

          <div className={styles.meta}>
            <span className={styles.metaItem}>
              <CalendarDays size={16} strokeWidth={2} aria-hidden='true' />

              {formatBookingDate(booking.startAt)}
            </span>

            <span className={styles.metaItem}>
              <Clock3 size={16} strokeWidth={2} aria-hidden='true' />

              {formatBookingTimeRange(booking.startAt, booking.endAt)}
            </span>

            <span className={styles.metaItem}>
              <DoorOpen size={16} strokeWidth={2} aria-hidden='true' />

              {booking.roomName}
            </span>

            <span className={styles.metaItem}>
              <MapPin size={16} strokeWidth={2} aria-hidden='true' />
              Floor {booking.roomFloor}
            </span>
          </div>
        </div>
      </button>

      {isUpcoming && onCancel && (
        <button
          type='button'
          className={styles.cancelButton}
          aria-label={`Cancel ${booking.title}`}
          onClick={() => {
            onCancel(booking)
          }}
        >
          <Trash2 size={17} strokeWidth={2} aria-hidden='true' />

          <span>Cancel</span>
        </button>
      )}
    </article>
  )
}

export default BookingListItem
