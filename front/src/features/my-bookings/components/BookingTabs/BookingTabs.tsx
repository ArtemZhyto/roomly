// Types
import type { MyBookingPeriod } from '../../types'

// Styles
import styles from './BookingTabs.module.scss'

interface BookingTabsProps {
  activePeriod: MyBookingPeriod
  upcomingCount: number
  pastCount: number
  onChange: (period: MyBookingPeriod) => void
}

const BookingTabs = ({ activePeriod, upcomingCount, pastCount, onChange }: BookingTabsProps) => {
  return (
    <div className={styles.tabs} role='tablist' aria-label='Booking periods'>
      <button
        type='button'
        role='tab'
        aria-selected={activePeriod === 'upcoming'}
        className={[styles.tab, activePeriod === 'upcoming' ? styles.tabActive : '']
          .filter(Boolean)
          .join(' ')}
        onClick={() => {
          onChange('upcoming')
        }}
      >
        Upcoming
        <span className={styles.count}>{upcomingCount}</span>
      </button>

      <button
        type='button'
        role='tab'
        aria-selected={activePeriod === 'past'}
        className={[styles.tab, activePeriod === 'past' ? styles.tabActive : '']
          .filter(Boolean)
          .join(' ')}
        onClick={() => {
          onChange('past')
        }}
      >
        Past
        <span className={styles.count}>{pastCount}</span>
      </button>
    </div>
  )
}

export default BookingTabs
