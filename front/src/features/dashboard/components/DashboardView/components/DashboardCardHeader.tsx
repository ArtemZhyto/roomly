// Modules
import type { LucideIcon } from 'lucide-react'

// Styles
import styles from '../DashboardView.module.scss'

type DashboardStatusVariant = 'rooms' | 'upcoming'

interface DashboardCardHeaderProps {
  icon: LucideIcon
  status: string
  statusVariant: DashboardStatusVariant
}

const DashboardCardHeader = ({ icon: Icon, status, statusVariant }: DashboardCardHeaderProps) => {
  const statusClassName = [
    styles.status,

    statusVariant === 'rooms' ? styles.statusRooms : styles.statusUpcoming,
  ].join(' ')

  return (
    <div className={styles.header}>
      <div className={styles.cardIcon} aria-hidden='true'>
        <Icon size={22} strokeWidth={2} />
      </div>

      <div className={statusClassName}>
        <span className={styles.statusDot} aria-hidden='true' />

        {status}
      </div>
    </div>
  )
}

export default DashboardCardHeader
