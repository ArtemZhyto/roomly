'use client'

// Modules
import { RefreshCw, ServerOff } from 'lucide-react'

// Components
import EmptyState from '@components-ui/EmptyState'

interface DashboardServerErrorProps {
  isRetrying?: boolean
  onRetry: () => void
}

const DashboardServerError = ({ isRetrying = false, onRetry }: DashboardServerErrorProps) => {
  const action = (
    <button
      type='button'
      className='inline-flex min-h-11 items-center justify-center gap-2 rounded-control bg-primary px-4 text-sm font-semibold text-text-inverse transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary-subtle disabled:cursor-not-allowed disabled:opacity-60'
      disabled={isRetrying}
      onClick={onRetry}
    >
      <RefreshCw
        className={['size-4', isRetrying ? 'animate-spin' : ''].filter(Boolean).join(' ')}
        strokeWidth={2}
        aria-hidden='true'
      />

      {isRetrying ? 'Trying again...' : 'Try again'}
    </button>
  )

  return (
    <main className='grid min-h-dvh place-items-center bg-background px-4 py-8'>
      <div className='w-full max-w-180'>
        <EmptyState
          icon={ServerOff}
          title='Server unavailable'
          description='Roomly cannot connect to the server right now. Check your connection and try again.'
          action={action}
        />
      </div>
    </main>
  )
}

export default DashboardServerError
