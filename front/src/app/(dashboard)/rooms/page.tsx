'use client'

// Modules
import { useEffect, useState } from 'react'
import { DoorOpen, RefreshCw, TriangleAlert } from 'lucide-react'

// Components
import PageHeader from '@components/layout/PageHeader'
import TimezoneBadge from '@components-shared/TimezoneBadge'
import EmptyState from '@components-ui/EmptyState'

// Features
import { getRooms, RoomCard } from '@features/rooms'

// Types
import type { Room } from '@features/rooms'

type RoomsPageStatus = 'loading' | 'success' | 'error'

const RoomsPage = () => {
  const [rooms, setRooms] = useState<Room[]>([])
  const [status, setStatus] = useState<RoomsPageStatus>('loading')

  const loadRooms = async () => {
    setStatus('loading')

    try {
      const roomData = await getRooms()

      setRooms(
        roomData.map((room) => ({
          ...room,
          status: 'available',
        })),
      )

      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  useEffect(() => {
    void loadRooms()
  }, [])

  const emptyState = (
    <EmptyState
      icon={DoorOpen}
      title='No meeting rooms yet'
      description='Meeting rooms will appear here once they are added to the workspace.'
    />
  )

  const errorAction = (
    <button
      type='button'
      className='inline-flex min-h-11 items-center justify-center gap-2 rounded-control bg-primary px-4 text-sm font-semibold text-text-inverse transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary-subtle'
      onClick={() => {
        void loadRooms()
      }}
    >
      <RefreshCw className='size-4' strokeWidth={2} aria-hidden='true' />
      Try again
    </button>
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

      {status === 'loading' && (
        <section aria-label='Loading meeting rooms' aria-live='polite'>
          <span className='sr-only'>Loading meeting rooms...</span>

          <div className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3'>
            {Array.from({ length: 6 }).map((_, index) => (
              <article
                key={index}
                className='flex min-h-52 animate-pulse flex-col justify-between rounded-card border border-border bg-surface p-5'
              >
                <div className='flex flex-col gap-4'>
                  <div className='flex items-start justify-between gap-4'>
                    <div className='h-6 w-32 rounded-full bg-border' />
                    <div className='h-9 w-9 rounded-control bg-border' />
                  </div>

                  <div className='h-4 w-24 rounded-full bg-border' />

                  <div className='h-4 w-36 rounded-full bg-border' />
                </div>

                <div className='mt-8 flex items-center justify-between gap-4'>
                  <div className='h-7 w-24 rounded-full bg-border' />
                  <div className='h-10 w-28 rounded-control bg-border' />
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
      {status === 'error' && errorState}

      {status === 'success' && rooms.length === 0 && emptyState}

      {status === 'success' && rooms.length > 0 && (
        <section aria-labelledby='rooms-list-title'>
          <h2 id='rooms-list-title' className='sr-only'>
            Available meeting rooms
          </h2>

          <div className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3'>
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default RoomsPage
