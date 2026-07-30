// Types
import type { ScheduleBooking, ScheduleSlotSelection } from '../../types'
import type { ScheduleGridSlot } from './schedule-grid.types'

// Utils
import {
  createSlotEnd,
  createSlotStart,
  formatDateForInput,
  formatScheduleTime,
  isSlotOccupied,
  isWithinOfficeHours,
} from './schedule-grid.utils'

// Styles
import styles from './ScheduleGrid.module.scss'

interface ScheduleSlotButtonProps {
  day: Date
  slot: ScheduleGridSlot
  bookings: ScheduleBooking[]
  currentTime: Date
  roomId: number
  onSelectSlot: (selection: ScheduleSlotSelection) => void
}

const ScheduleSlotButton = ({
  day,
  slot,
  bookings,
  currentTime,
  roomId,
  onSelectSlot,
}: ScheduleSlotButtonProps) => {
  const slotStart = createSlotStart(day, slot.index)

  const slotEnd = createSlotEnd(slotStart)

  const occupied = isSlotOccupied(slotStart, slotEnd, bookings)

  const isInsideOfficeHours = isWithinOfficeHours(slotStart, slotEnd)

  const isPast = slotStart.getTime() <= currentTime.getTime()

  const isAvailable = isInsideOfficeHours && !occupied && !isPast

  const date = formatDateForInput(slotStart)

  const startTime = formatScheduleTime(slotStart)

  const endTime = formatScheduleTime(slotEnd)

  const slotLabel = `${date}, ${startTime} – ${endTime}`

  const className = [
    styles.gridSlot,
    occupied ? styles.gridSlotOccupied : '',
    isPast ? styles.gridSlotPast : '',
    !isInsideOfficeHours ? styles.gridSlotOutsideOffice : '',
    isAvailable ? styles.gridSlotAvailable : '',
  ]
    .filter(Boolean)
    .join(' ')

  const handleClick = () => {
    if (!isAvailable) {
      return
    }

    onSelectSlot({
      roomId,
      date,
      startTime,
      endTime,
    })
  }

  return (
    <button
      type='button'
      className={className}
      onClick={handleClick}
      disabled={!isAvailable}
      aria-label={
        isAvailable
          ? `Book room on ${slotLabel}`
          : occupied
            ? `Occupied slot: ${slotLabel}`
            : !isInsideOfficeHours
              ? `Outside office hours: ${slotLabel}`
              : `Unavailable past slot: ${slotLabel}`
      }
    />
  )
}

export default ScheduleSlotButton
