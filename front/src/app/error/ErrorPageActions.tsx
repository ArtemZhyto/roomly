'use client'

// Modules
import { useRouter } from 'next/navigation'
import { ArrowLeft, RefreshCw } from 'lucide-react'

// Styles
import styles from './ErrorPage.module.scss'

const ErrorPageActions = () => {
  const router = useRouter()

  const handleRetry = () => {
    router.replace('/rooms')
    router.refresh()
  }

  return (
    <div className={styles.actions}>
      <button type='button' className={styles.primaryButton} onClick={handleRetry}>
        <RefreshCw size={17} strokeWidth={2} aria-hidden='true' />
        Try again
      </button>

      <button
        type='button'
        className={styles.secondaryButton}
        onClick={() => {
          router.back()
        }}
      >
        <ArrowLeft size={17} strokeWidth={2} aria-hidden='true' />
        Go back
      </button>
    </div>
  )
}

export default ErrorPageActions
