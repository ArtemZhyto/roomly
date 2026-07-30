// Modules
import { DoorOpen } from 'lucide-react'

// Features
import { mockRooms } from '@features/rooms'

// Types
import type { BookingFormErrors, BookingFormValues, UpdateBookingField } from './booking-form.types'

// Styles
import styles from './BookingForm.module.scss'

interface BookingRoomFieldProps {
  value: BookingFormValues['roomId']
  error?: BookingFormErrors['roomId']
  isLoading: boolean
  updateField: UpdateBookingField
}

const BookingRoomField = ({ value, error, isLoading, updateField }: BookingRoomFieldProps) => {
  const controlClassName = [
    styles.control,
    styles.controlWithIcon,
    error ? styles.controlInvalid : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={styles.field}>
      <label htmlFor='booking-room' className={styles.label}>
        Meeting room
      </label>

      <div className={styles.controlWrapper}>
        <DoorOpen className={styles.controlIcon} size={17} strokeWidth={2} aria-hidden='true' />

        <select
          id='booking-room'
          value={value}
          className={controlClassName}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'booking-room-error' : undefined}
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

      {error && (
        <p id='booking-room-error' className={styles.error}>
          {error}
        </p>
      )}
    </div>
  )
}

export default BookingRoomField
