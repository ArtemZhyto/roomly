'use client'

// Components
import ProfileMenu from '@components/layout/ProfileMenu'

// Hooks
import { useLogout } from '@features/auth'

const ConnectedProfileMenu = () => {
  const { isLoggingOut, handleLogout } = useLogout()

  return <ProfileMenu isLogoutLoading={isLoggingOut} onLogout={() => void handleLogout()} />
}

export default ConnectedProfileMenu
