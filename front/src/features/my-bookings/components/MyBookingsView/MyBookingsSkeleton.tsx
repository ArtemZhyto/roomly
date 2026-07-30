// Styles
import styles from './MyBookingsView.module.scss'

const SKELETON_ITEMS = 3

const MyBookingsSkeleton = () => {
  return (
    <div className={styles.skeletonList} aria-label='Loading bookings' aria-busy='true'>
      {Array.from({
        length: SKELETON_ITEMS,
      }).map((_, index) => (
        <div key={index} className={styles.skeletonCard}>
          <div className={styles.skeletonIcon} />

          <div className={styles.skeletonContent}>
            <div className={styles.skeletonTitle} />

            <div className={styles.skeletonMeta} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default MyBookingsSkeleton
