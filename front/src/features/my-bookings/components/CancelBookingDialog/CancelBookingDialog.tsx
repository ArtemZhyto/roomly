'use client'

// Modules
import { AlertTriangle, LoaderCircle, X } from 'lucide-react'

// Types
import type { MyBooking } from '../../types'

// Utils
import { formatBookingDate, formatBookingTimeRange } from '../../utils'

// Hooks
import useCancelBookingDialog from './useCancelBookingDialog'

// Styles
import styles from './CancelBookingDialog.module.scss'

interface CancelBookingDialogProps {
  booking: MyBooking
  isOpen: boolean
  isLoading: boolean
  onClose: () => void
  onExited: () => void
  onConfirm: () => void
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

  return (
    <div
      className={[styles.backdrop, isVisible ? styles.backdropVisible : '']
        .filter(Boolean)
        .join(' ')}
      role='presentation'
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          requestClose()
        }
      }}
    >
      <section
        ref={dialogRef}
        className={[styles.dialog, isVisible ? styles.dialogVisible : ''].filter(Boolean).join(' ')}
        role='alertdialog'
        aria-modal='true'
        aria-labelledby='cancel-booking-title'
        aria-describedby='cancel-booking-description'
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
            This action will remove your reservation. You will need to book the room again if you
            change your mind.
          </p>

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
        </div>

        <footer className={styles.actions}>
          <button
            type='button'
            className={styles.secondaryButton}
            disabled={isLoading}
            onClick={requestClose}
          >
            Keep booking
          </button>

          <button
            type='button'
            className={styles.dangerButton}
            disabled={isLoading}
            onClick={onConfirm}
          >
            {isLoading && (
              <LoaderCircle
                className={styles.spinner}
                size={17}
                strokeWidth={2}
                aria-hidden='true'
              />
            )}

            {isLoading ? 'Cancelling...' : 'Cancel booking'}
          </button>
        </footer>
      </section>
    </div>
  )
}

export default CancelBookingDialog
