// Modules
import { Clock3 } from 'lucide-react'

// Types
import type { BookingFormErrors, BookingFormValues, UpdateBookingField } from './booking-form.types'

// Constants
import { TIME_INPUT_STEP_SECONDS } from './booking-form.constants'

// Styles
import styles from './BookingForm.module.scss'

interface BookingTimeFieldsProps {
  startTime: BookingFormValues['startTime']
  endTime: BookingFormValues['endTime']
  startTimeError?: BookingFormErrors['startTime']
  endTimeError?: BookingFormErrors['endTime']
  isLoading: boolean
  updateField: UpdateBookingField
}

const BookingTimeFields = ({
  startTime,
  endTime,
  startTimeError,
  endTimeError,
  isLoading,
  updateField,
}: BookingTimeFieldsProps) => {
  const startTimeClassName = [
    styles.control,
    styles.controlWithIcon,
    startTimeError ? styles.controlInvalid : '',
  ]
    .filter(Boolean)
    .join(' ')

  const endTimeClassName = [
    styles.control,
    styles.controlWithIcon,
    endTimeError ? styles.controlInvalid : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={styles.timeGrid}>
      <div className={styles.field}>
        <label htmlFor='booking-start-time' className={styles.label}>
          Start time
        </label>

        <div className={styles.controlWrapper}>
          <Clock3 className={styles.controlIcon} size={17} strokeWidth={2} aria-hidden='true' />

          <input
            id='booking-start-time'
            type='time'
            step={TIME_INPUT_STEP_SECONDS}
            value={startTime}
            className={startTimeClassName}
            aria-invalid={Boolean(startTimeError)}
            aria-describedby={startTimeError ? 'booking-start-time-error' : undefined}
            disabled={isLoading}
            onChange={(event) => {
              updateField('startTime', event.target.value)
            }}
          />
        </div>

        {startTimeError && (
          <p id='booking-start-time-error' className={styles.error}>
            {startTimeError}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor='booking-end-time' className={styles.label}>
          End time
        </label>

        <div className={styles.controlWrapper}>
          <Clock3 className={styles.controlIcon} size={17} strokeWidth={2} aria-hidden='true' />

          <input
            id='booking-end-time'
            type='time'
            step={TIME_INPUT_STEP_SECONDS}
            value={endTime}
            className={endTimeClassName}
            aria-invalid={Boolean(endTimeError)}
            aria-describedby={endTimeError ? 'booking-end-time-error' : undefined}
            disabled={isLoading}
            onChange={(event) => {
              updateField('endTime', event.target.value)
            }}
          />
        </div>

        {endTimeError && (
          <p id='booking-end-time-error' className={styles.error}>
            {endTimeError}
          </p>
        )}
      </div>
    </div>
  )
}

export default BookingTimeFields
