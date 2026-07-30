// Types
import type { ScheduleGridSlot } from './schedule-grid.types'

// Styles
import styles from './ScheduleGrid.module.scss'

interface ScheduleTimeColumnProps {
  slots: ScheduleGridSlot[]
}

const ScheduleTimeColumn = ({ slots }: ScheduleTimeColumnProps) => {
  return (
    <div className={styles.timeColumn}>
      {slots.map((slot) => (
        <div key={slot.index} className={styles.timeSlot}>
          <span className={slot.minute === 30 ? styles.halfHourLabel : undefined}>
            {slot.label}
          </span>
        </div>
      ))}
    </div>
  )
}

export default ScheduleTimeColumn
