// Components
import ScheduleLoadingState from '../ScheduleLoadingState'

const SchedulePageLoadingState = () => {
  return (
    <section
      className='flex flex-col gap-5'
      aria-label='Loading room schedule'
      aria-live='polite'
      aria-busy='true'
    >
      <span className='sr-only'>Loading room schedule...</span>

      <div className='flex flex-wrap items-center justify-between gap-4'>
        <div className='flex flex-col gap-2'>
          <div className='h-6 w-40 animate-pulse rounded-full bg-border' />

          <div className='h-4 w-56 animate-pulse rounded-full bg-border' />
        </div>

        <div className='h-10 w-48 animate-pulse rounded-control bg-border' />
      </div>

      <div className='h-11 w-36 animate-pulse rounded-control bg-border' />

      <ScheduleLoadingState />
    </section>
  )
}

export default SchedulePageLoadingState
