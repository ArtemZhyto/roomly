// Modules
import { CalendarDays } from 'lucide-react'

// Lib
import { formatDateInputValue } from './booking-form.utils'

// Types
import type { BookingFormErrors, BookingFormValues, UpdateBookingField } from './booking-form.types'

// Styles
import styles from './BookingForm.module.scss'

interface BookingDateFieldProps {
  value: BookingFormValues['date']
  error?: BookingFormErrors['date']
  isLoading: boolean
  updateField: UpdateBookingField
}

const BookingDateField = ({ value, error, isLoading, updateField }: BookingDateFieldProps) => {
  const controlClassName = [
    styles.control,
    styles.controlWithIcon,
    error ? styles.controlInvalid : '',
  ]
    .filter(Boolean)
    .join(' ')

  const minimumDate = formatDateInputValue(new Date())

  return (
    <div className={styles.field}>
      <label htmlFor='booking-date' className={styles.label}>
        Date
      </label>

      <div className={styles.controlWrapper}>
        <CalendarDays className={styles.controlIcon} size={17} strokeWidth={2} aria-hidden='true' />

        <input
          id='booking-date'
          type='date'
          min={minimumDate}
          value={value}
          className={controlClassName}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'booking-date-error' : undefined}
          disabled={isLoading}
          onChange={(event) => {
            updateField('date', event.target.value)
          }}
        />
      </div>

      {error && (
        <p id='booking-date-error' className={styles.error}>
          {error}
        </p>
      )}
    </div>
  )
}

export default BookingDateField
