// Modules
import Link from 'next/link'
import { ArrowRight, CalendarDays, DoorOpen } from 'lucide-react'

// Components
import PageHeader from '@components/layout/PageHeader'
import EmptyState from '@components-ui/EmptyState'

const DashboardPage = () => {
  const dashboardAction = (
    <Link
      href='/rooms'
      className='inline-flex min-h-11 items-center justify-center gap-2 rounded-control bg-primary px-4 text-sm font-semibold text-text-inverse no-underline transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary-subtle'
    >
      Browse rooms
      <ArrowRight className='size-4' strokeWidth={2} aria-hidden='true' />
    </Link>
  )

  return (
    <div className='flex flex-col gap-8'>
      <PageHeader
        title='Dashboard'
        description='A quick overview of your rooms, schedule and upcoming bookings.'
      />

      <div className='grid gap-4 sm:grid-cols-2'>
        <section className='rounded-card border border-border bg-surface p-5'>
          <div className='flex items-center gap-3'>
            <span className='grid size-10 place-items-center rounded-control bg-primary-subtle text-primary'>
              <DoorOpen className='size-5' strokeWidth={1.9} aria-hidden='true' />
            </span>

            <div>
              <p className='m-0 text-sm text-text-muted'>Available rooms</p>

              <p className='mt-1 text-2xl font-bold text-text-primary'>-</p>
            </div>
          </div>
        </section>

        <section className='rounded-card border border-border bg-surface p-5'>
          <div className='flex items-center gap-3'>
            <span className='grid size-10 place-items-center rounded-control bg-primary-subtle text-primary'>
              <CalendarDays className='size-5' strokeWidth={1.9} aria-hidden='true' />
            </span>

            <div>
              <p className='m-0 text-sm text-text-muted'>Upcoming bookings</p>

              <p className='mt-1 text-2xl font-bold text-text-primary'>-</p>
            </div>
          </div>
        </section>
      </div>

      <EmptyState
        icon={CalendarDays}
        title='No upcoming bookings yet'
        description='Your next room reservations will appear here once booking is connected.'
        action={dashboardAction}
      />
    </div>
  )
}

export default DashboardPage
