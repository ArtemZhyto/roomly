'use client'

// Modules
import { useEffect } from 'react'
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react'

// Hooks
import useNotifications from '../../hooks/useNotifications'

// Types
import type { NotificationType, ToastNotification } from '../../types/notification.types'

// Styles
import styles from './ToastViewport.module.scss'

const toastIcons: Record<NotificationType, typeof CheckCircle2> = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
}

interface ToastItemProps {
  toast: ToastNotification
  onDismiss: (id: string) => void
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

  return (
    <article
      className={[styles.toast, styles[`toast-${toast.type}`]].filter(Boolean).join(' ')}
      role={toast.type === 'error' ? 'alert' : 'status'}
    >
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

const ToastViewport = () => {
  const { toasts, dismissToast } = useNotifications()

  if (toasts.length === 0) {
    return null
  }

  return (
    <div className={styles.viewport} aria-label='Notifications'>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={dismissToast} />
      ))}
    </div>
  )
}

export default ToastViewport
