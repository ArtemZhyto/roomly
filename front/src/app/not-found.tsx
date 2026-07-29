// Modules
import Link from 'next/link'
import { ArrowLeft, DoorOpen } from 'lucide-react'

// Components
import RoomlyLogo from '@components-shared/RoomlyLogo'

// Styles
import styles from './not-found.module.scss'

const NotFoundPage = () => {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <RoomlyLogo />

        <div className={styles.icon} aria-hidden='true'>
          <DoorOpen size={28} />
        </div>

        <p className={styles.code}>404</p>

        <h1 className={styles.title}>Room not found</h1>

        <p className={styles.description}>
          This room may have been moved, renamed, or booked in another universe.
        </p>

        <Link href='/dashboard' className={styles.action}>
          <ArrowLeft size={17} aria-hidden='true' />
          Back to dashboard
        </Link>
      </section>
    </main>
  )
}

export default NotFoundPage
