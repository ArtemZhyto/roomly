// Styles
import styles from './AuthBrandPanel.module.scss'

const BookingPreview = () => {
  return (
    <section className={styles.bookingPreview} aria-label='Booking confirmation preview'>
      <div className={styles.bookingIcon} aria-hidden='true'>
        ✓
      </div>

      <div className={styles.bookingContent}>
        <p className={styles.bookingLabel}>Booking confirmed</p>
        <p className={styles.bookingTitle}>Atlas Room</p>
        <p className={styles.bookingDetails}>Today, 09:30–10:15</p>
      </div>
    </section>
  )
}

export default BookingPreview
