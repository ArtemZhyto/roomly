'use client'

// Styles
import styles from './LogoutButton.module.scss'

// Modules
import { LogOut } from 'lucide-react'

interface LogoutButtonProps {
  isLoading?: boolean
  onClick: () => void
}

const LogoutButton = ({ isLoading = false, onClick }: LogoutButtonProps) => {
  return (
    <button
      type='button'
      disabled={isLoading}
      onClick={onClick}
      className={`${styles.button} inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-control border px-3.5 text-sm font-semibold`}
      aria-label={isLoading ? 'Signing out' : 'Sign out'}
    >
      {isLoading ? (
        <span
          className={`${styles.spinner} size-4 shrink-0 rounded-full border-2`}
          aria-hidden='true'
        />
      ) : (
        <LogOut className={`${styles.icon} size-4 shrink-0`} strokeWidth={2} aria-hidden='true' />
      )}

      <span>{isLoading ? 'Signing out...' : 'Sign out'}</span>
    </button>
  )
}

export default LogoutButton
