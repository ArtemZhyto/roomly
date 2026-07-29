// Modules
import { CalendarDays, Clock3, DoorOpen } from 'lucide-react'

// Features
import { mockRooms } from '@features/rooms'

// Types
import type { BookingFormErrors, BookingFormValues } from '../../types'
import type { UpdateBookingField } from './booking-form.types'

// Constants
import { MAX_TITLE_LENGTH, TIME_INPUT_STEP_SECONDS } from './booking-form.constants'

// Styles
import styles from './BookingForm.module.scss'

interface BookingFormFieldsProps {
  values: BookingFormValues
  errors: BookingFormErrors
  durationLabel: string
  isLoading: boolean
  updateField: UpdateBookingField
}

const BookingFormFields = ({
  values,
  errors,
  durationLabel,
  isLoading,
  updateField,
}: BookingFormFieldsProps) => {
  return (
    <>
      <div className={styles.field}>
        <div className={styles.labelRow}>
          <label htmlFor='booking-title' className={styles.label}>
            Meeting title
          </label>

          <span className={styles.counter}>
            {values.title.length}/{MAX_TITLE_LENGTH}
          </span>
        </div>

        <input
          id='booking-title'
          type='text'
          value={values.title}
          maxLength={MAX_TITLE_LENGTH}
          placeholder='e.g. Product planning'
          className={[styles.control, errors.title ? styles.controlInvalid : '']
            .filter(Boolean)
            .join(' ')}
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? 'booking-title-error' : undefined}
          disabled={isLoading}
          onChange={(event) => {
            updateField('title', event.target.value)
          }}
        />

        {errors.title && (
          <p id='booking-title-error' className={styles.error}>
            {errors.title}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor='booking-room' className={styles.label}>
          Meeting room
        </label>

        <div className={styles.controlWrapper}>
          <DoorOpen className={styles.controlIcon} size={17} strokeWidth={2} aria-hidden='true' />

          <select
            id='booking-room'
            value={values.roomId}
            className={[
              styles.control,
              styles.controlWithIcon,
              errors.roomId ? styles.controlInvalid : '',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-invalid={Boolean(errors.roomId)}
            disabled={isLoading}
            onChange={(event) => {
              updateField('roomId', Number(event.target.value))
            }}
          >
            {mockRooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name} · Floor {room.floor} · {room.capacity} people
              </option>
            ))}
          </select>
        </div>

        {errors.roomId && <p className={styles.error}>{errors.roomId}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor='booking-date' className={styles.label}>
          Date
        </label>

        <div className={styles.controlWrapper}>
          <CalendarDays
            className={styles.controlIcon}
            size={17}
            strokeWidth={2}
            aria-hidden='true'
          />

          <input
            id='booking-date'
            type='date'
            value={values.date}
            className={[
              styles.control,
              styles.controlWithIcon,
              errors.date ? styles.controlInvalid : '',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-invalid={Boolean(errors.date)}
            disabled={isLoading}
            onChange={(event) => {
              updateField('date', event.target.value)
            }}
          />
        </div>

        {errors.date && <p className={styles.error}>{errors.date}</p>}
      </div>

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
              value={values.startTime}
              className={[
                styles.control,
                styles.controlWithIcon,
                errors.startTime ? styles.controlInvalid : '',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-invalid={Boolean(errors.startTime)}
              disabled={isLoading}
              onChange={(event) => {
                updateField('startTime', event.target.value)
              }}
            />
          </div>

          {errors.startTime && <p className={styles.error}>{errors.startTime}</p>}
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
              value={values.endTime}
              className={[
                styles.control,
                styles.controlWithIcon,
                errors.endTime ? styles.controlInvalid : '',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-invalid={Boolean(errors.endTime)}
              disabled={isLoading}
              onChange={(event) => {
                updateField('endTime', event.target.value)
              }}
            />
          </div>

          {errors.endTime && <p className={styles.error}>{errors.endTime}</p>}
        </div>
      </div>

      <div className={styles.summary}>
        <span>Duration</span>
        <strong>{durationLabel}</strong>
      </div>

      <p className={styles.hint}>
        Bookings must use 30-minute intervals and last between 30 minutes and 4 hours.
      </p>
    </>
  )
}

export default BookingFormFields
