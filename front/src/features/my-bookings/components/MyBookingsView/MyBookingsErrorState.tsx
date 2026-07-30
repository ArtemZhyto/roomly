// Modules
import { AlertCircle, RefreshCw } from 'lucide-react'

// Styles
import styles from './MyBookingsView.module.scss'

interface MyBookingsErrorStateProps {
  onRetry: () => void
}

const MyBookingsErrorState = ({ onRetry }: MyBookingsErrorStateProps) => {
  return (
    <div className={styles.emptyState} role='alert'>
      <div className={styles.errorIcon}>
        <AlertCircle size={24} strokeWidth={2} aria-hidden='true' />
      </div>

      <h2 className={styles.stateTitle}>Could not load bookings</h2>

      <p className={styles.stateDescription}>
        Something went wrong while loading your bookings. Please try again.
      </p>

      <button type='button' className={styles.retryButton} onClick={onRetry}>
        <RefreshCw size={16} strokeWidth={2} aria-hidden='true' />
        Try again
      </button>
    </div>
  )
}

export default MyBookingsErrorState
