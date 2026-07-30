'use client'

// Modules
import { useMemo, type CSSProperties } from 'react'

// Components
import ScheduleDayColumn from './ScheduleDayColumn'
import ScheduleDayHeader from './ScheduleDayHeader'
import ScheduleTimeColumn from './ScheduleTimeColumn'

// Constants
import { HOURS_IN_DAY, MINUTES_IN_HOUR } from './schedule-grid.constants'

// Utils
import { getWeekDays } from '../../utils'
import { formatScheduleTime, getMinutesFromDayStart, getScheduleSlots } from './schedule-grid.utils'

// Hooks
import useCurrentTime from './useCurrentTime'

// Types
import type { ScheduleGridProps, ScheduleGridSlot } from './schedule-grid.types'

// Styles
import styles from './ScheduleGrid.module.scss'

const ScheduleGrid = ({ weekStart, bookings, roomId, onSelectSlot }: ScheduleGridProps) => {
  const currentTime = useCurrentTime()

  const weekDays = useMemo(() => getWeekDays(weekStart), [weekStart])

  const slots = useMemo<ScheduleGridSlot[]>(() => getScheduleSlots(), [])

  const totalMinutes = HOURS_IN_DAY * MINUTES_IN_HOUR

  const currentTimeMinutes = getMinutesFromDayStart(currentTime)

  const currentTimePosition = (currentTimeMinutes / totalMinutes) * 100

  const calendarStyle = {
    '--slot-count': slots.length,
  } as CSSProperties

  return (
    <section className={styles.wrapper} aria-label='Weekly room schedule'>
      <div className={styles.currentTimeStatus}>
        <span className={styles.currentTimeStatusDot} aria-hidden='true' />

        <span>Current time: {formatScheduleTime(currentTime)}</span>

        <span className={styles.currentTimeStatusNote}>Office hours: 09:00–19:00 Europe/Kyiv</span>
      </div>

      <div className={styles.scrollArea}>
        <div className={styles.calendar} style={calendarStyle}>
          <div className={styles.headerCorner}>Time</div>

          {weekDays.map((day) => (
            <ScheduleDayHeader key={day.toISOString()} day={day} currentTime={currentTime} />
          ))}

          <ScheduleTimeColumn slots={slots} />

          {weekDays.map((day) => (
            <ScheduleDayColumn
              key={day.toISOString()}
              day={day}
              slots={slots}
              bookings={bookings}
              currentTime={currentTime}
              totalMinutes={totalMinutes}
              currentTimePosition={currentTimePosition}
              isCurrentTimeVisible
              roomId={roomId}
              onSelectSlot={onSelectSlot}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ScheduleGrid
