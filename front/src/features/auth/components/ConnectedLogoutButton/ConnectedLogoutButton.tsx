'use client'

// Components
import LogoutButton from '@components/layout/LogoutButton/LogoutButton'

// Hooks
import useLogout from '../../hooks/useLogout'

const ConnectedLogoutButton = () => {
  const { isLoggingOut, logoutError, handleLogout } = useLogout()

  return (
    <div className='flex flex-col gap-2'>
      <LogoutButton isLoading={isLoggingOut} onClick={() => void handleLogout()} />

      {logoutError && (
        <p role='alert' className='m-0 text-sm text-danger'>
          {logoutError}
        </p>
      )}
    </div>
  )
}

export default ConnectedLogoutButton
