// Modules
import { AlertCircle } from 'lucide-react'

// Types
import type { BookingFormStatus } from './booking-form.types'

// Styles
import styles from './BookingForm.module.scss'

interface BookingFormMessagesProps {
  status: BookingFormStatus
}

const BookingFormMessages = ({ status }: BookingFormMessagesProps) => {
  if (status === 'conflict') {
    return (
      <div className={styles.formMessage} role='alert'>
        <AlertCircle size={18} strokeWidth={2} aria-hidden='true' />

        <span>This time slot has already been booked. Choose another time.</span>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className={styles.formMessage} role='alert'>
        <AlertCircle size={18} strokeWidth={2} aria-hidden='true' />

        <span>The booking could not be created. Please try again.</span>
      </div>
    )
  }

  return null
}

export default BookingFormMessages
