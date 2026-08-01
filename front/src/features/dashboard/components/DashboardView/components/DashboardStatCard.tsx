// Modules
import Link from 'next/link'

import { ArrowRight, type LucideIcon } from 'lucide-react'

// Local components
import DashboardCardHeader from './DashboardCardHeader'

// Styles
import styles from '../DashboardView.module.scss'

interface DashboardStatCardProps {
  icon: LucideIcon
  status: string
  statusVariant: 'rooms' | 'upcoming'
  eyebrow: string
  value: number
  valueLabel: string
  description: string
  href: string
  actionLabel: string
}

const DashboardStatCard = ({
  icon,
  status,
  statusVariant,
  eyebrow,
  value,
  valueLabel,
  description,
  href,
  actionLabel,
}: DashboardStatCardProps) => {
  return (
    <article className={styles.card}>
      <DashboardCardHeader icon={icon} status={status} statusVariant={statusVariant} />

      <div className={styles.content}>
        <p className={styles.eyebrow}>{eyebrow}</p>

        <div className={styles.valueRow}>
          <strong className={styles.value}>{value}</strong>

          <span className={styles.valueLabel}>{valueLabel}</span>
        </div>

        <p className={styles.description}>{description}</p>
      </div>

      <Link href={href} className={styles.action}>
        {actionLabel}

        <ArrowRight className={styles.actionIcon} size={17} strokeWidth={2} aria-hidden='true' />
      </Link>
    </article>
  )
}

export default DashboardStatCard
