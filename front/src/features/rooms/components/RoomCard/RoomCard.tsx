// Modules
import Link from 'next/link'
import { ArrowRight, Building2, Clock3, Users } from 'lucide-react'

// Types
import type { Room, RoomAvailabilityStatus } from '../../types'

// Styles
import styles from './RoomCard.module.scss'

interface RoomCardProps {
  room: Room
}

const statusLabels: Record<RoomAvailabilityStatus, string> = {
  available: 'Available now',
  busy: 'Currently busy',
  unavailable: 'Unavailable',
}

const RoomCard = ({ room }: RoomCardProps) => {
  const statusClassName = [styles.status, styles[`status-${room.status}`]].filter(Boolean).join(' ')

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <div className={styles.roomIcon} aria-hidden='true'>
          <Building2 size={22} strokeWidth={2} />
        </div>

        <div className={statusClassName}>
          <span className={styles.statusDot} aria-hidden='true' />
          {statusLabels[room.status]}
        </div>
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>{room.name}</h2>

        <div className={styles.details}>
          <div className={styles.detail}>
            <Building2 size={17} strokeWidth={2} aria-hidden='true' />
            <span>Floor {room.floor}</span>
          </div>

          <div className={styles.detail}>
            <Users size={17} strokeWidth={2} aria-hidden='true' />
            <span>
              Up to {room.capacity} {room.capacity === 1 ? 'person' : 'people'}
            </span>
          </div>
        </div>

        {room.status === 'busy' && room.nextAvailableAt && (
          <div className={styles.availability}>
            <Clock3 size={16} strokeWidth={2} aria-hidden='true' />
            <span>Available from {room.nextAvailableAt}</span>
          </div>
        )}

        {room.status === 'unavailable' && (
          <div className={styles.availability}>
            <Clock3 size={16} strokeWidth={2} aria-hidden='true' />
            <span>Not available during office hours</span>
          </div>
        )}
      </div>

      <Link
        href={`/schedule?room=${room.id}`}
        className={styles.action}
        aria-label={`View schedule for ${room.name}`}
      >
        View schedule
        <ArrowRight className={styles.actionIcon} size={17} strokeWidth={2} aria-hidden='true' />
      </Link>
    </article>
  )
}

export default RoomCard
