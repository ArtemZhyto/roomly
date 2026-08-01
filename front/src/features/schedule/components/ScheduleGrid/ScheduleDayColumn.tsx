// Types
import type { ScheduleBooking, ScheduleSlotSelection } from '../../types'
import type { ScheduleGridSlot } from './schedule-grid.types'

// Components
import ScheduleBookingCard from './ScheduleBookingCard'
import ScheduleSlotButton from './ScheduleSlotButton'

// Utils
import { isSameDay } from '../../utils'
import { formatScheduleTime } from './utils'

// Styles
import styles from './ScheduleGrid.module.scss'

interface ScheduleDayColumnProps {
  day: Date
  slots: ScheduleGridSlot[]
  bookings: ScheduleBooking[]
  currentTime: Date
  totalMinutes: number
  currentTimePosition: number
  isCurrentTimeVisible: boolean
  roomId: number
  onSelectSlot: (selection: ScheduleSlotSelection) => void
}

const ScheduleDayColumn = ({
  day,
  slots,
  bookings,
  currentTime,
  totalMinutes,
  currentTimePosition,
  isCurrentTimeVisible,
  roomId,
  onSelectSlot,
}: ScheduleDayColumnProps) => {
  const isToday = isSameDay(day, currentTime)

  const dayBookings = bookings.filter((booking) => isSameDay(new Date(booking.startAt), day))

  const className = [styles.dayColumn, isToday ? styles.dayColumnToday : '']
    .filter(Boolean)
    .join(' ')

  return (
    <div className={className}>
      {slots.map((slot) => (
        <ScheduleSlotButton
          key={slot.index}
          day={day}
          slot={slot}
          bookings={dayBookings}
          currentTime={currentTime}
          roomId={roomId}
          onSelectSlot={onSelectSlot}
        />
      ))}

      {isToday && isCurrentTimeVisible && (
        <div
          className={styles.currentTimeLine}
          style={{
            top: `${currentTimePosition}%`,
          }}
          aria-label={`Current time: ${formatScheduleTime(currentTime)}`}
        >
          <span className={styles.currentTimeDot} aria-hidden='true' />
        </div>
      )}

      {dayBookings.map((booking) => (
        <ScheduleBookingCard key={booking.id} booking={booking} totalMinutes={totalMinutes} />
      ))}
    </div>
  )
}

export default ScheduleDayColumn
