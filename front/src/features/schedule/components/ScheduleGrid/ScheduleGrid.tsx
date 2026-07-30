'use client'

// Modules
import { useMemo } from 'react'

// Components
import ScheduleDayColumn from './ScheduleDayColumn'
import ScheduleDayHeader from './ScheduleDayHeader'
import ScheduleTimeColumn from './ScheduleTimeColumn'

// Constants
import { OFFICE_END_HOUR, OFFICE_START_HOUR } from '../../constants'
import { MINUTES_IN_HOUR } from './schedule-grid.constants'

// Utils
import { getScheduleSlots, getWeekDays } from '../../utils'
import { formatScheduleTime, getMinutesFromOfficeStart } from './schedule-grid.utils'
import useCurrentTime from './useCurrentTime'

// Types
import type { ScheduleGridProps, ScheduleGridSlot } from './schedule-grid.types'

// Styles
import styles from './ScheduleGrid.module.scss'

const ScheduleGrid = ({ weekStart, bookings, roomId, onSelectSlot }: ScheduleGridProps) => {
  const currentTime = useCurrentTime()

  const weekDays = useMemo(() => getWeekDays(weekStart), [weekStart])

  const slots = useMemo<ScheduleGridSlot[]>(() => getScheduleSlots(), [])

  const totalMinutes = (OFFICE_END_HOUR - OFFICE_START_HOUR) * MINUTES_IN_HOUR

  const currentTimeMinutes = getMinutesFromOfficeStart(currentTime)

  const isCurrentTimeVisible = currentTimeMinutes >= 0 && currentTimeMinutes <= totalMinutes

  const currentTimePosition = (currentTimeMinutes / totalMinutes) * 100

  return (
    <section className={styles.wrapper} aria-label='Weekly room schedule'>
      <div className={styles.currentTimeStatus}>
        <span className={styles.currentTimeStatusDot} aria-hidden='true' />

        <span>Current time: {formatScheduleTime(currentTime)}</span>

        {!isCurrentTimeVisible && (
          <span className={styles.currentTimeStatusNote}>Outside office hours</span>
        )}
      </div>

      <div className={styles.scrollArea}>
        <div className={styles.calendar}>
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
              isCurrentTimeVisible={isCurrentTimeVisible}
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
