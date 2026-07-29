// Modules
import { CalendarPlus, X } from 'lucide-react'

// Styles
import styles from './BookingDialog.module.scss'

interface BookingDialogHeaderProps {
  title: string
  description: string
  onClose: () => void
}

const BookingDialogHeader = ({ title, description, onClose }: BookingDialogHeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.heading}>
        <div className={styles.icon} aria-hidden='true'>
          <CalendarPlus size={22} strokeWidth={2} />
        </div>

        <div>
          <h2 id='booking-dialog-title' className={styles.title}>
            {title}
          </h2>

          <p id='booking-dialog-description' className={styles.description}>
            {description}
          </p>
        </div>
      </div>

      <button
        type='button'
        className={styles.closeButton}
        aria-label='Close booking dialog'
        onClick={onClose}
      >
        <X size={20} strokeWidth={2} aria-hidden='true' />
      </button>
    </header>
  )
}

export default BookingDialogHeader
