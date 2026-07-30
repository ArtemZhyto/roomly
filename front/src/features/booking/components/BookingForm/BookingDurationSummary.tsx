// Styles
import styles from './BookingForm.module.scss'

interface BookingDurationSummaryProps {
  durationLabel: string
}

const BookingDurationSummary = ({ durationLabel }: BookingDurationSummaryProps) => {
  return (
    <>
      <div className={styles.summary}>
        <span>Duration</span>

        <strong>{durationLabel}</strong>
      </div>

      <p className={styles.hint}>
        Bookings must use 30-minute intervals and last between 30 minutes and 4 hours.
      </p>
    </>
  )
}

export default BookingDurationSummary
