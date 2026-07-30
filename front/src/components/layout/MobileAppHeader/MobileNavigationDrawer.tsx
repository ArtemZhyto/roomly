'use client'

// Modules
import { useEffect } from 'react'

// Components
import SidebarNavigation from '../SidebarNavigation'
import SidebarUserCard from '../SidebarUserCard'

// Types
import type { SidebarUserCardUser } from '../SidebarUserCard'

// Styles
import styles from './MobileAppHeader.module.scss'

interface MobileNavigationDrawerProps {
  isOpen: boolean
  disableAnimation: boolean
  user: SidebarUserCardUser
  onClose: () => void
}

const MobileNavigationDrawer = ({
  isOpen,
  disableAnimation,
  user,
  onClose,
}: MobileNavigationDrawerProps) => {
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = ''

      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const overlayClassName = [
    styles.overlay,
    isOpen ? styles.overlayOpen : '',
    disableAnimation ? styles.noTransition : '',
  ]
    .filter(Boolean)
    .join(' ')

  const drawerClassName = [
    styles.drawer,
    isOpen ? styles.drawerOpen : '',
    disableAnimation ? styles.noTransition : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <>
      <button
        type='button'
        className={overlayClassName}
        aria-label='Close navigation'
        aria-hidden={!isOpen}
        tabIndex={isOpen ? 0 : -1}
        onClick={onClose}
      />

      <aside
        id='mobile-navigation-drawer'
        className={drawerClassName}
        aria-label='Mobile navigation'
        aria-hidden={!isOpen}
      >
        <div className='flex h-full flex-col'>
          <div className={`${styles.navigation} flex-1 px-4 py-5`}>
            <SidebarNavigation onNavigate={onClose} />
          </div>

          <div className={`${styles.footer} p-4`}>
            <SidebarUserCard user={user} />
          </div>
        </div>
      </aside>
    </>
  )
}

export default MobileNavigationDrawer
