'use client'

// Modules
import { AlertTriangle, CalendarX2, LoaderCircle, Repeat2, X } from 'lucide-react'

// Types
import type { BookingCancellationScope, MyBooking } from '../../types'

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
            {isRecurring
              ? 'Choose whether to cancel only this occurrence or every booking in the recurring series.'
              : 'This action will remove your reservation. You will need to book the room again if you change your mind.'}
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

        <footer
          className={[styles.actions, isRecurring ? styles.actionsRecurring : styles.actionsSingle]
            .filter(Boolean)
            .join(' ')}
        >
          {isRecurring ? (
            <>
              <button
                type='button'
                className={styles.keepButton}
                disabled={isLoading}
                onClick={requestClose}
              >
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
                    <LoaderCircle
                      className={styles.spinner}
                      size={17}
                      strokeWidth={2}
                      aria-hidden='true'
                    />
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
          ) : (
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
                  <LoaderCircle
                    className={styles.spinner}
                    size={17}
                    strokeWidth={2}
                    aria-hidden='true'
                  />
                ) : (
                  <CalendarX2 size={17} strokeWidth={2} aria-hidden='true' />
                )}

                {isLoading ? 'Cancelling...' : 'Cancel booking'}
              </button>

              <button
                type='button'
                className={styles.keepButton}
                disabled={isLoading}
                onClick={requestClose}
              >
                Keep booking
              </button>
            </>
          )}
        </footer>
      </section>
    </div>
  )
}

export default CancelBookingDialog
