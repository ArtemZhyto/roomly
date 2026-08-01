// Modules
import { CalendarX2, LoaderCircle, Repeat2 } from 'lucide-react'

// Types
import type { BookingCancellationScope } from '../../../types'

// Styles
import styles from '../CancelBookingDialog.module.scss'

interface RecurringCancellationActionsProps {
  isLoading: boolean
  onClose: () => void
  onConfirm: (scope: BookingCancellationScope) => void
}

const RecurringCancellationActions = ({
  isLoading,
  onClose,
  onConfirm,
}: RecurringCancellationActionsProps) => {
  return (
    <>
      <button type='button' className={styles.keepButton} disabled={isLoading} onClick={onClose}>
        Keep booking
      </button>

      <div className={styles.cancelActions}>
        <button
          type='button'
          className={styles.occurrenceButton}
          disabled={isLoading}
          onClick={() => {
            onConfirm('occurrence')
          }}
        >
          <CalendarX2 size={17} strokeWidth={2} aria-hidden='true' />

          <span>
            Cancel this
            <small>Only this occurrence</small>
          </span>
        </button>

        <button
          type='button'
          className={styles.seriesButton}
          disabled={isLoading}
          onClick={() => {
            onConfirm('series')
          }}
        >
          {isLoading ? (
            <LoaderCircle className={styles.spinner} size={17} strokeWidth={2} aria-hidden='true' />
          ) : (
            <Repeat2 size={17} strokeWidth={2} aria-hidden='true' />
          )}

          <span>
            {isLoading ? 'Cancelling...' : 'Cancel series'}

            {!isLoading && <small>All occurrences</small>}
          </span>
        </button>
      </div>
    </>
  )
}

export default RecurringCancellationActions
