// Modules
import { DoorOpen } from 'lucide-react'

// Features
import type { Room } from '@features/rooms'

// Styles
import styles from './BookingForm.module.scss'

interface BookingRoomFieldProps {
  room: Room
}

const BookingRoomField = ({ room }: BookingRoomFieldProps) => {
  return (
    <div className={styles.field}>
      <span className={styles.label}>Meeting room</span>

      <div className={`${styles.control} ${styles.controlWithIcon}`}>
        <DoorOpen className={styles.controlIcon} size={17} strokeWidth={2} aria-hidden='true' />

        <span>
          {room.name} · Floor {room.floor} · {room.capacity} people
        </span>
      </div>
    </div>
  )
}

export default BookingRoomField
