'use client'

// Modules
import { useCallback, useEffect, useState } from 'react'

// Components
import RoomlyLogo from '@components-shared/RoomlyLogo'
import MobileMenuButton from './MobileMenuButton'
import MobileNavigationDrawer from './MobileNavigationDrawer'

// Types
import type { MobileAppHeaderProps } from './mobileAppHeader.types'

// Styles
import styles from './MobileAppHeader.module.scss'

const DESKTOP_MEDIA_QUERY = '(min-width: 961px)'

const MobileAppHeader = ({ user }: MobileAppHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const [disableAnimation, setDisableAnimation] = useState(false)

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  const closeMenuImmediately = useCallback(() => {
    setDisableAnimation(true)
    setIsMenuOpen(false)

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setDisableAnimation(false)
      })
    })
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen((currentValue) => !currentValue)
  }

  useEffect(() => {
    const desktopMediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY)

    const handleViewportChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        closeMenuImmediately()
      }
    }

    desktopMediaQuery.addEventListener('change', handleViewportChange)

    return () => {
      desktopMediaQuery.removeEventListener('change', handleViewportChange)
    }
  }, [closeMenuImmediately])

  return (
    <>
      <header className={styles.header}>
        <div className='flex min-h-16 items-center justify-between gap-4 px-4'>
          <RoomlyLogo />

          <MobileMenuButton isOpen={isMenuOpen} onClick={toggleMenu} />
        </div>
      </header>

      <MobileNavigationDrawer
        isOpen={isMenuOpen}
        disableAnimation={disableAnimation}
        user={user}
        onClose={closeMenu}
      />
    </>
  )
}

export default MobileAppHeader
