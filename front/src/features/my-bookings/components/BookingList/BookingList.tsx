// Types
import type { MyBooking } from '../../types'

// Components
import BookingListItem from '../BookingListItem'

// Styles
import styles from './BookingList.module.scss'

interface BookingListProps {
  bookings: MyBooking[]
  onOpenBooking: (booking: MyBooking) => void
  onCancelBooking?: (booking: MyBooking) => void
}

const BookingList = ({ bookings, onOpenBooking, onCancelBooking }: BookingListProps) => {
  return (
    <div className={styles.list}>
      {bookings.map((booking) => (
        <BookingListItem
          key={booking.id}
          booking={booking}
          onOpen={onOpenBooking}
          onCancel={onCancelBooking}
        />
      ))}
    </div>
  )
}

export default BookingList
