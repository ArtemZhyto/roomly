'use client'

// Modules
import { useEffect } from 'react'
import { X } from 'lucide-react'

// Types
import type { ToastNotification } from '../../types/notification.types'

// Local data
import { toastIcons } from './toast-icons'

// Styles
import styles from './ToastViewport.module.scss'

interface ToastItemProps {
  toast: ToastNotification
  onDismiss: (toastId: string) => void
}

const ToastItem = ({ toast, onDismiss }: ToastItemProps) => {
  const Icon = toastIcons[toast.type]

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      onDismiss(toast.id)
    }, toast.duration)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [onDismiss, toast.duration, toast.id])

  const toastClassName = [styles.toast, styles[`toast-${toast.type}`]].filter(Boolean).join(' ')

  return (
    <article className={toastClassName} role={toast.type === 'error' ? 'alert' : 'status'}>
      <div className={styles.icon}>
        <Icon size={20} strokeWidth={2} aria-hidden='true' />
      </div>

      <div className={styles.content}>
        <strong className={styles.title}>{toast.title}</strong>

        {toast.message && <p className={styles.message}>{toast.message}</p>}
      </div>

      <button
        type='button'
        className={styles.closeButton}
        aria-label='Dismiss notification'
        onClick={() => {
          onDismiss(toast.id)
        }}
      >
        <X size={17} strokeWidth={2} aria-hidden='true' />
      </button>
    </article>
  )
}

export default ToastItem
