// Modules
import Link from 'next/link'
import { ArrowRight, CalendarRange } from 'lucide-react'

// Components
import PageHeader from '@components/layout/PageHeader'
import TimezoneBadge from '@components-shared/TimezoneBadge'
import EmptyState from '@components-ui/EmptyState'

// Features
import { mockRooms } from '@features/rooms'
import { WeeklySchedule } from '@features/schedule'

interface SchedulePageProps {
  searchParams: Promise<{
    room?: string | string[]
  }>
}

const SchedulePage = async ({ searchParams }: SchedulePageProps) => {
  const query = await searchParams

  const roomParam = Array.isArray(query.room) ? query.room[0] : query.room

  const roomId = Number(roomParam)

  const selectedRoom = Number.isInteger(roomId)
    ? mockRooms.find((room) => room.id === roomId)
    : undefined

  const selectRoomAction = (
    <Link
      href='/rooms'
      className='inline-flex min-h-11 items-center justify-center gap-2 rounded-control bg-primary px-4 text-sm font-semibold text-text-inverse no-underline transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary-subtle'
    >
      Select a room
      <ArrowRight className='size-4' strokeWidth={2} aria-hidden='true' />
    </Link>
  )

  return (
    <div className='flex flex-col gap-8'>
      <PageHeader
        title='Schedule'
        description='View weekly room availability and choose a free 30-minute time slot.'
        aside={<TimezoneBadge />}
      />

      {selectedRoom ? (
        <WeeklySchedule room={selectedRoom} />
      ) : (
        <EmptyState
          icon={CalendarRange}
          title='Choose a room to view its schedule'
          description='Select a meeting room from the catalogue to open its weekly calendar.'
          action={selectRoomAction}
        />
      )}
    </div>
  )
}

export default SchedulePage
