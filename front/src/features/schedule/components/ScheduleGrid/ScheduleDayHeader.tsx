// Utils
import { formatDayNumber, formatWeekDay, isSameDay } from '../../utils'

// Styles
import styles from './ScheduleGrid.module.scss'

interface ScheduleDayHeaderProps {
  day: Date
  currentTime: Date
}

const ScheduleDayHeader = ({ day, currentTime }: ScheduleDayHeaderProps) => {
  const isToday = isSameDay(day, currentTime)

  const className = [styles.dayHeader, isToday ? styles.dayHeaderToday : '']
    .filter(Boolean)
    .join(' ')

  return (
    <div className={className}>
      <span className={styles.dayName}>{formatWeekDay(day)}</span>

      <span className={styles.dayNumber}>{formatDayNumber(day)}</span>
    </div>
  )
}

export default ScheduleDayHeader
