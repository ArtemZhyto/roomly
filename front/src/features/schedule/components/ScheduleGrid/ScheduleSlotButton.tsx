// Types
import type { ScheduleBooking, ScheduleSlotSelection } from '../../types'

import type { ScheduleGridSlot } from './schedule-grid.types'

// Utils
import {
  createSlotEnd,
  createSlotStart,
  formatScheduleInputDate,
  formatScheduleTime,
  isSlotOccupied,
  isWithinOfficeHours,
} from './utils'

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

  const date = formatScheduleInputDate(slotStart)

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

  const handleClick = (): void => {
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

  const ariaLabel = isAvailable
    ? `Book room on ${slotLabel}`
    : occupied
      ? `Occupied slot: ${slotLabel}`
      : !isInsideOfficeHours
        ? `Outside office hours: ${slotLabel}`
        : `Unavailable past slot: ${slotLabel}`

  return (
    <button
      type='button'
      className={className}
      disabled={!isAvailable}
      aria-label={ariaLabel}
      onClick={handleClick}
    />
  )
}

export default ScheduleSlotButton
