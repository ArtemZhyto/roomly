'use client'

// Hooks
import useNotifications from '../../hooks/useNotifications'

// Local components
import ToastItem from './ToastItem'

// Styles
import styles from './ToastViewport.module.scss'

const ToastViewport = () => {
  const { toasts, dismissToast } = useNotifications()

  if (toasts.length === 0) {
    return null
  }

  return (
    <div className={styles.viewport} aria-label='Notifications'>
      {toasts.map((toast) => {
        return <ToastItem key={toast.id} toast={toast} onDismiss={dismissToast} />
      })}
    </div>
  )
}

export default ToastViewport
