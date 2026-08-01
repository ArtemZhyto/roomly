'use client'

// Modules
import { AlertTriangle, X } from 'lucide-react'

// Local components
import CancelBookingSummary from './components/CancelBookingSummary'
import RecurringCancellationActions from './components/RecurringCancellationActions'
import SingleCancellationActions from './components/SingleCancellationActions'

// Hooks
import useCancelBookingDialog from './useCancelBookingDialog'

// Types
import type { BookingCancellationScope, MyBooking } from '../../types'

// Styles
import styles from './CancelBookingDialog.module.scss'

interface CancelBookingDialogProps {
  booking: MyBooking
  isOpen: boolean
  isLoading: boolean
  onClose: () => void
  onExited: () => void
  onConfirm: (scope: BookingCancellationScope) => void
}

const CancelBookingDialog = ({
  booking,
  isOpen,
  isLoading,
  onClose,
  onExited,
  onConfirm,
}: CancelBookingDialogProps) => {
  const { dialogRef, isVisible, requestClose } = useCancelBookingDialog({
    isOpen,
    isLoading,
    onClose,
    onExited,
  })

  const isRecurring = booking.seriesId !== null

  const backdropClassName = [styles.backdrop, isVisible ? styles.backdropVisible : '']
    .filter(Boolean)
    .join(' ')

  const dialogClassName = [styles.dialog, isVisible ? styles.dialogVisible : '']
    .filter(Boolean)
    .join(' ')

  const actionsClassName = [
    styles.actions,

    isRecurring ? styles.actionsRecurring : styles.actionsSingle,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={backdropClassName}
      role='presentation'
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          requestClose()
        }
      }}
    >
      <section
        ref={dialogRef}
        className={dialogClassName}
        role='alertdialog'
        aria-modal='true'
        aria-labelledby='cancel-booking-title'
        aria-describedby='cancel-booking-description'
        tabIndex={-1}
      >
        <button
          type='button'
          className={styles.closeButton}
          aria-label='Close dialog'
          disabled={isLoading}
          onClick={requestClose}
        >
          <X size={18} strokeWidth={2} aria-hidden='true' />
        </button>

        <div className={styles.icon}>
          <AlertTriangle size={24} strokeWidth={2} aria-hidden='true' />
        </div>

        <div className={styles.content}>
          <h2 id='cancel-booking-title' className={styles.title}>
            Cancel booking?
          </h2>

          <p id='cancel-booking-description' className={styles.description}>
            {isRecurring
              ? 'Choose whether to cancel only this occurrence or every booking in the recurring series.'
              : 'This action will remove your reservation. You will need to book the room again if you change your mind.'}
          </p>

          <CancelBookingSummary booking={booking} />
        </div>

        <footer className={actionsClassName}>
          {isRecurring ? (
            <RecurringCancellationActions
              isLoading={isLoading}
              onClose={requestClose}
              onConfirm={onConfirm}
            />
          ) : (
            <SingleCancellationActions
              isLoading={isLoading}
              onClose={requestClose}
              onConfirm={onConfirm}
            />
          )}
        </footer>
      </section>
    </div>
  )
}

export default CancelBookingDialog
