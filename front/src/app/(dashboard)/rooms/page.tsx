// Modules
import Link from 'next/link'
import { DoorOpen, RefreshCw, TriangleAlert } from 'lucide-react'

// Components
import PageHeader from '@components/layout/PageHeader'
import TimezoneBadge from '@components-shared/TimezoneBadge'
import EmptyState from '@components-ui/EmptyState'

// Features
import { mockRooms, RoomCard } from '@features/rooms'

type RoomsPageState = 'success' | 'empty' | 'error'

const RoomsPage = () => {
  const pageState = 'success' as RoomsPageState

  const emptyState = (
    <EmptyState
      icon={DoorOpen}
      title='No meeting rooms yet'
      description='Meeting rooms will appear here once they are added to the workspace.'
    />
  )

  const errorAction = (
    <Link
      href='/rooms'
      className='inline-flex min-h-11 items-center justify-center gap-2 rounded-control bg-primary px-4 text-sm font-semibold text-text-inverse no-underline transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary-subtle'
    >
      <RefreshCw className='size-4' strokeWidth={2} aria-hidden='true' />
      Try again
    </Link>
  )

  const errorState = (
    <EmptyState
      icon={TriangleAlert}
      title='Could not load meeting rooms'
      description='Something went wrong while loading the room catalogue. Please try again.'
      action={errorAction}
    />
  )

  return (
    <div className='flex flex-col gap-8'>
      <PageHeader
        title='Meeting rooms'
        description='Choose a room to view its weekly schedule and find an available time.'
        aside={<TimezoneBadge />}
      />

      {pageState === 'success' && (
        <section aria-labelledby='rooms-list-title'>
          <h2 id='rooms-list-title' className='sr-only'>
            Available meeting rooms
          </h2>

          <div className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3'>
            {mockRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </section>
      )}

      {pageState === 'empty' && emptyState}

      {pageState === 'error' && errorState}
    </div>
  )
}

export default RoomsPage
