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

      <div className={styles.avatarGroup} aria-label='Three attendees'>
        <span className={styles.avatar}>AM</span>
        <span className={styles.avatar}>SK</span>
        <span className={styles.avatar}>+1</span>
      </div>
    </section>
  )
}

export default BookingPreview
