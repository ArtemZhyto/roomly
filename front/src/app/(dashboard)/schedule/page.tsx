// Modules
import Link from 'next/link'
import { ArrowRight, CalendarRange } from 'lucide-react'

// Components
import PageHeader from '@components/layout/PageHeader'
import EmptyState from '@components-ui/EmptyState'
import TimezoneBadge from '@components-shared/TimezoneBadge'

const SchedulePage = () => {
  const scheduleAction = (
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
        title='Meeting rooms'
        description='Choose a room to view its weekly schedule and find an available time.'
        aside={<TimezoneBadge />}
      />

      <EmptyState
        icon={CalendarRange}
        title='Choose a room to view its schedule'
        description='The weekly calendar will appear here after you select a meeting room.'
        action={scheduleAction}
      />
    </div>
  )
}

export default SchedulePage
