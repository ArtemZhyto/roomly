// Components
import BookingPreview from './BookingPreview'
import SchedulePreview from './SchedulePreview'
import RoomlyLogo from '@components/shared/RoomlyLogo'

// Styles
import styles from './AuthBrandPanel.module.scss'

const AuthBrandPanel = () => {
  return (
    <aside className={styles.panel}>
      <div className={styles.glow} aria-hidden='true' />

      <div className={styles.content}>
        <header className={styles.header}>
          <RoomlyLogo href={undefined} light />

          <h2 className={styles.title}>Meetings start with the right room.</h2>

          <p className={styles.description}>
            Find an available space, book it in seconds, and keep your team focused on what matters.
          </p>
        </header>

        <div className={styles.previewArea}>
          <SchedulePreview />
          <BookingPreview />
        </div>

        <footer className={styles.footer}>
          <span className={styles.footerDot} aria-hidden='true' />
          Simple room booking for modern teams
        </footer>
      </div>
    </aside>
  )
}

export default AuthBrandPanel
