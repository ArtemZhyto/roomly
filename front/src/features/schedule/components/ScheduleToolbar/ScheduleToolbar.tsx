// Modules
import { CalendarDays, ChevronLeft, ChevronRight, MapPin, Users } from 'lucide-react'

// Features
import type { Room } from '@features/rooms'

// Styles
import styles from './ScheduleToolbar.module.scss'

interface ScheduleToolbarProps {
  room: Room
  weekRange: string
  isCurrentWeek: boolean
  onPreviousWeek: () => void
  onCurrentWeek: () => void
  onNextWeek: () => void
}

const ScheduleToolbar = ({
  room,
  weekRange,
  isCurrentWeek,
  onPreviousWeek,
  onCurrentWeek,
  onNextWeek,
}: ScheduleToolbarProps) => {
  return (
    <section className={styles.toolbar} aria-label='Schedule controls'>
      <div className={styles.room}>
        <div className={styles.roomIcon} aria-hidden='true'>
          <CalendarDays size={22} strokeWidth={2} />
        </div>

        <div className={styles.roomContent}>
          <h2 className={styles.roomName}>{room.name}</h2>

          <div className={styles.roomDetails}>
            <span className={styles.roomDetail}>
              <MapPin size={15} strokeWidth={2} aria-hidden='true' />
              Floor {room.floor}
            </span>

            <span className={styles.roomDetail}>
              <Users size={15} strokeWidth={2} aria-hidden='true' />
              Up to {room.capacity} {room.capacity === 1 ? 'person' : 'people'}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.navigation}>
        <button
          type='button'
          className={styles.iconButton}
          aria-label='Previous week'
          onClick={onPreviousWeek}
        >
          <ChevronLeft size={18} strokeWidth={2} aria-hidden='true' />
        </button>

        <div className={styles.weekRange} aria-live='polite'>
          {weekRange}
        </div>

        <button
          type='button'
          className={styles.iconButton}
          aria-label='Next week'
          onClick={onNextWeek}
        >
          <ChevronRight size={18} strokeWidth={2} aria-hidden='true' />
        </button>

        <button
          type='button'
          className={styles.todayButton}
          disabled={isCurrentWeek}
          onClick={onCurrentWeek}
        >
          Today
        </button>
      </div>
    </section>
  )
}

export default ScheduleToolbar
