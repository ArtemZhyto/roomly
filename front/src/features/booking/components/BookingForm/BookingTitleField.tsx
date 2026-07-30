// Types
import type { BookingFormErrors, BookingFormValues, UpdateBookingField } from './booking-form.types'

// Constants
import { MAX_TITLE_LENGTH } from './booking-form.constants'

// Styles
import styles from './BookingForm.module.scss'

interface BookingTitleFieldProps {
  value: BookingFormValues['title']
  error?: BookingFormErrors['title']
  isLoading: boolean
  updateField: UpdateBookingField
}

const BookingTitleField = ({ value, error, isLoading, updateField }: BookingTitleFieldProps) => {
  const controlClassName = [styles.control, error ? styles.controlInvalid : '']
    .filter(Boolean)
    .join(' ')

  return (
    <div className={styles.field}>
      <div className={styles.labelRow}>
        <label htmlFor='booking-title' className={styles.label}>
          Meeting title
        </label>

        <span className={styles.counter}>
          {value.length}/{MAX_TITLE_LENGTH}
        </span>
      </div>

      <input
        id='booking-title'
        type='text'
        value={value}
        maxLength={MAX_TITLE_LENGTH}
        placeholder='e.g. Product planning'
        className={controlClassName}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? 'booking-title-error' : undefined}
        disabled={isLoading}
        onChange={(event) => {
          updateField('title', event.target.value)
        }}
      />

      {error && (
        <p id='booking-title-error' className={styles.error}>
          {error}
        </p>
      )}
    </div>
  )
}

export default BookingTitleField
