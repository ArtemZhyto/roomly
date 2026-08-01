'use client'

// Modules
import Link from 'next/link'

import { LogOut, MoreHorizontal, Settings } from 'lucide-react'

// Hooks
import useProfileMenu from './hooks/useProfileMenu'

// Types
import type { ProfileMenuProps } from './profileMenu.types'

// Styles
import styles from './ProfileMenu.module.scss'

const ProfileMenu = ({ isLogoutLoading = false, onLogout }: ProfileMenuProps) => {
  const { isOpen, menuId, containerRef, triggerRef, closeMenu, toggleMenu } = useProfileMenu()

  const handleLogout = (): void => {
    closeMenu()
    onLogout?.()
  }

  const menuClassName = [styles.menu, isOpen ? styles.menuOpen : ''].filter(Boolean).join(' ')

  return (
    <div ref={containerRef} className={styles.container}>
      <button
        ref={triggerRef}
        type='button'
        className={styles.trigger}
        aria-label='Open profile menu'
        aria-haspopup='menu'
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={toggleMenu}
      >
        <MoreHorizontal size={20} aria-hidden='true' />
      </button>

      <div id={menuId} className={menuClassName} role='menu' aria-hidden={!isOpen}>
        <Link
          href='/settings'
          className={styles.item}
          role='menuitem'
          tabIndex={isOpen ? 0 : -1}
          onClick={closeMenu}
        >
          <Settings size={17} aria-hidden='true' />

          <span>Settings</span>
        </Link>

        <div className={styles.separator} role='separator' />

        <button
          type='button'
          className={[styles.item, styles.logoutItem].join(' ')}
          role='menuitem'
          tabIndex={isOpen ? 0 : -1}
          disabled={isLogoutLoading}
          onClick={handleLogout}
        >
          <LogOut size={17} aria-hidden='true' />

          <span>{isLogoutLoading ? 'Logging out...' : 'Log out'}</span>
        </button>
      </div>
    </div>
  )
}

export default ProfileMenu
