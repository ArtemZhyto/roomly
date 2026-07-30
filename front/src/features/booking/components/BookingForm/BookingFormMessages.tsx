// Modules
import { AlertCircle } from 'lucide-react'

// Types
import type { BookingFormStatus } from './booking-form.types'

// Styles
import styles from './BookingForm.module.scss'

interface BookingFormMessagesProps {
  status: BookingFormStatus
  serverError?: string
}

const BookingFormMessages = ({ status, serverError }: BookingFormMessagesProps) => {
  if (status !== 'conflict' && status !== 'error') {
    return null
  }

  const message =
    serverError ??
    (status === 'conflict'
      ? 'This time slot has already been booked. Choose another time.'
      : 'The booking could not be created. Please try again.')

  return (
    <div className={styles.formMessage} role='alert'>
      <AlertCircle size={18} strokeWidth={2} aria-hidden='true' />

      <span>{message}</span>
    </div>
  )
}

export default BookingFormMessages
