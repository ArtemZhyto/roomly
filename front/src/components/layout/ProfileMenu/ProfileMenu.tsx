'use client'

// Modules
import Link from 'next/link'
import { useEffect, useId, useRef, useState } from 'react'
import { LogOut, MoreHorizontal, Settings } from 'lucide-react'

// Types
import type { ProfileMenuProps } from './profileMenu.types'

// Styles
import styles from './ProfileMenu.module.scss'

const ProfileMenu = ({ isLogoutLoading = false, onLogout }: ProfileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const menuId = useId()

  const closeMenu = () => {
    setIsOpen(false)
  }

  const toggleMenu = () => {
    setIsOpen((currentValue) => !currentValue)
  }

  const handleLogout = () => {
    closeMenu()
    onLogout?.()
  }

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target

      if (target instanceof Node && !containerRef.current?.contains(target)) {
        closeMenu()
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') {
        return
      }

      closeMenu()
      triggerRef.current?.focus()
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

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

        <div className={styles.separator} />

        <button
          type='button'
          className={`${styles.item} ${styles.logoutItem}`}
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
