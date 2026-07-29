'use client'

// Modules
import { useEffect, useState } from 'react'
import { Clock3, Globe2 } from 'lucide-react'

// Styles
import styles from './TimezoneBadge.module.scss'

interface TimezoneBadgeProps {
  officeTimezone?: string
}

const TimezoneBadge = ({ officeTimezone = 'Europe/Kyiv' }: TimezoneBadgeProps) => {
  const [userTimezone, setUserTimezone] = useState<string | null>(null)

  useEffect(() => {
    const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

    setUserTimezone(detectedTimezone || 'UTC')
  }, [])

  const isReady = userTimezone !== null

  const hasTimezoneDifference = isReady && userTimezone !== officeTimezone

  const className = [
    styles.badge,
    isReady ? styles.badgeReady : '',
    hasTimezoneDifference ? styles.badgeExpanded : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={className} aria-busy={!isReady}>
      <div className={styles.row}>
        <Clock3 className='size-4 shrink-0 text-primary' strokeWidth={2} aria-hidden='true' />

        <span>Office time: {officeTimezone}</span>
      </div>

      {hasTimezoneDifference && (
        <div className={styles.row}>
          <Globe2 className='size-4 shrink-0 text-secondary' strokeWidth={2} aria-hidden='true' />

          <span>Your timezone: {userTimezone}</span>
        </div>
      )}
    </div>
  )
}

export default TimezoneBadge
