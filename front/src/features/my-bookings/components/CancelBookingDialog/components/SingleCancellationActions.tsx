// Modules
import { CalendarX2, LoaderCircle } from 'lucide-react'

// Types
import type { BookingCancellationScope } from '../../../types'

// Styles
import styles from '../CancelBookingDialog.module.scss'

interface SingleCancellationActionsProps {
  isLoading: boolean
  onClose: () => void
  onConfirm: (scope: BookingCancellationScope) => void
}

const SingleCancellationActions = ({
  isLoading,
  onClose,
  onConfirm,
}: SingleCancellationActionsProps) => {
  return (
    <>
      <button
        type='button'
        className={styles.dangerButton}
        disabled={isLoading}
        onClick={() => {
          onConfirm('occurrence')
        }}
      >
        {isLoading ? (
          <LoaderCircle className={styles.spinner} size={17} strokeWidth={2} aria-hidden='true' />
        ) : (
          <CalendarX2 size={17} strokeWidth={2} aria-hidden='true' />
        )}

        {isLoading ? 'Cancelling...' : 'Cancel booking'}
      </button>

      <button type='button' className={styles.keepButton} disabled={isLoading} onClick={onClose}>
        Keep booking
      </button>
    </>
  )
}

export default SingleCancellationActions
