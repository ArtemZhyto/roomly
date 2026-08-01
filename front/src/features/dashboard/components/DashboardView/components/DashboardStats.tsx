// Modules
import { Building2, CalendarDays } from 'lucide-react'

// Local components
import DashboardStatCard from './DashboardStatCard'

// Styles
import styles from '../DashboardView.module.scss'

interface DashboardStatsProps {
  roomsCount: number
  upcomingBookingsCount: number
}

const DashboardStats = ({ roomsCount, upcomingBookingsCount }: DashboardStatsProps) => {
  return (
    <div className={styles.statsGrid}>
      <DashboardStatCard
        icon={Building2}
        status='Rooms'
        statusVariant='rooms'
        eyebrow='Meeting rooms'
        value={roomsCount}
        valueLabel='in the office'
        description='Browse all rooms and open their weekly schedules.'
        href='/rooms'
        actionLabel='Browse rooms'
      />

      <DashboardStatCard
        icon={CalendarDays}
        status='Upcoming'
        statusVariant='upcoming'
        eyebrow='Upcoming bookings'
        value={upcomingBookingsCount}
        valueLabel='scheduled'
        description='Review your future reservations and manage them.'
        href='/my-bookings'
        actionLabel='View my bookings'
      />
    </div>
  )
}

export default DashboardStats
