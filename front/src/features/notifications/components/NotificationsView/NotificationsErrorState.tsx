// Modules
import { TriangleAlert, RefreshCw } from 'lucide-react'

// Components
import EmptyState from '@components-ui/EmptyState'

interface NotificationsErrorStateProps {
  message?: string
  onRetry: () => void
}

const NotificationsErrorState = ({ message, onRetry }: NotificationsErrorStateProps) => {
  const action = (
    <button
      type='button'
      className='inline-flex min-h-11 items-center justify-center gap-2 rounded-control bg-primary px-4 text-sm font-semibold text-text-inverse transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary-subtle'
      onClick={onRetry}
    >
      <RefreshCw className='size-4' strokeWidth={2} aria-hidden='true' />
      Try again
    </button>
  )

  return (
    <EmptyState
      icon={TriangleAlert}
      title='Could not load notifications'
      description={
        message || 'Something went wrong while loading your notifications. Please try again.'
      }
      action={action}
    />
  )
}

export default NotificationsErrorState
