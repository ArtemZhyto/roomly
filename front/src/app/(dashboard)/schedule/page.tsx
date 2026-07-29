// Modules
import Link from 'next/link'
import { ArrowRight, CalendarRange } from 'lucide-react'

// Components
import PageHeader from '@components/layout/PageHeader'
import EmptyState from '@components-ui/EmptyState'

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

  const timezoneBadge = (
    <div className='inline-flex min-h-10 items-center gap-2 rounded-control border border-border bg-surface px-3.5 text-sm font-medium text-text-secondary'>
      <span className='size-2 rounded-full bg-primary' aria-hidden='true' />

      <span>Office time: Europe/Kyiv</span>
    </div>
  )

  return (
    <div className='flex flex-col gap-8'>
      <PageHeader
        title='Schedule'
        description='View weekly room availability and choose a free 30-minute time slot.'
        aside={timezoneBadge}
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
