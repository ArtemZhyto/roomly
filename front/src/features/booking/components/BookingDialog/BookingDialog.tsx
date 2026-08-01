'use client'

// Components
import BookingDialogHeader from './BookingDialogHeader'

// Hooks
import useBookingDialog from './useBookingDialog'

// Types
import type { BookingDialogProps } from './booking-dialog.types'

// Utils
import { injectCloseModal } from './booking-dialog.utils'

// Styles
import styles from './BookingDialog.module.scss'

const BookingDialog = ({
  isOpen,
  title = 'Book a meeting room',
  description = 'Choose the date and time for your meeting.',
  children,
  onClose,
}: BookingDialogProps) => {
  const { dialogRef, overlayRef, closeDialog } = useBookingDialog({
    isOpen,
    onClose,
  })

  if (!isOpen) {
    return null
  }

  const childrenWithClose = injectCloseModal(children, closeDialog)

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      role='presentation'
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          closeDialog()
        }
      }}
    >
      <section
        ref={dialogRef}
        className={styles.dialog}
        role='dialog'
        aria-modal='true'
        aria-labelledby='booking-dialog-title'
        aria-describedby='booking-dialog-description'
        tabIndex={-1}
      >
        <BookingDialogHeader title={title} description={description} onClose={closeDialog} />

        <div className={styles.content}>{childrenWithClose}</div>
      </section>
    </div>
  )
}

export default BookingDialog
