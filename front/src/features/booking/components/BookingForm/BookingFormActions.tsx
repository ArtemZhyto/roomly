// Modules
import { LoaderCircle } from 'lucide-react'

// Styles
import styles from './BookingForm.module.scss'

interface BookingFormActionsProps {
  isLoading: boolean
  onCancel: () => void
}

const BookingFormActions = ({ isLoading, onCancel }: BookingFormActionsProps) => {
  return (
    <footer className={styles.actions}>
      <button
        type='button'
        className={styles.secondaryButton}
        disabled={isLoading}
        onClick={onCancel}
      >
        Cancel
      </button>

      <button type='submit' className={styles.primaryButton} disabled={isLoading}>
        {isLoading && (
          <LoaderCircle className={styles.spinner} size={17} strokeWidth={2} aria-hidden='true' />
        )}

        {isLoading ? 'Booking...' : 'Book room'}
      </button>
    </footer>
  )
}

export default BookingFormActions
