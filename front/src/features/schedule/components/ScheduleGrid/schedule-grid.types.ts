// Types
import type { ScheduleBooking, ScheduleSlotSelection } from '../../types'

export interface ScheduleGridProps {
  weekStart: Date
  bookings: ScheduleBooking[]
  roomId: number
  onSelectSlot: (selection: ScheduleSlotSelection) => void
}

export interface ScheduleGridSlot {
  index: number
  label: string
  minute: number
}
