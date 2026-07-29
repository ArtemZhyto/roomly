// Modules
import { ArrowLeft, DoorOpen } from 'lucide-react'

// Components
import RoomlyLogo from '@components-shared/RoomlyLogo'
import { AuthActionLink } from '@features/auth/components/AuthSubmitButton'

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

        <div className='mt-6 w-full'>
          <AuthActionLink href='/dashboard' label='Back to dashboard' icon={ArrowLeft} />
        </div>
      </section>
    </main>
  )
}

export default NotFoundPage
