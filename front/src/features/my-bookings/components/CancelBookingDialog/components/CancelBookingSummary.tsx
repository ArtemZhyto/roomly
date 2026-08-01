// Types
import type { MyBooking } from '../../../types'

// Utils
import { formatBookingDate, formatBookingTimeRange } from '../../../utils'

// Styles
import styles from '../CancelBookingDialog.module.scss'

interface CancelBookingSummaryProps {
  booking: MyBooking
}

const CancelBookingSummary = ({ booking }: CancelBookingSummaryProps) => {
  return (
    <div className={styles.bookingSummary}>
      <strong>{booking.title}</strong>

      <span>
        {booking.roomName} · Floor {booking.roomFloor}
      </span>

      <span>
        {formatBookingDate(booking.startAt)} ·{' '}
        {formatBookingTimeRange(booking.startAt, booking.endAt)}
      </span>
    </div>
  )
}

export default CancelBookingSummary
