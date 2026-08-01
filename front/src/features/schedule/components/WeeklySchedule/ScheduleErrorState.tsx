interface ScheduleErrorStateProps {
  onRetry: () => void
}

const ScheduleErrorState = ({ onRetry }: ScheduleErrorStateProps) => {
  return (
    <div
      className='flex min-h-72 flex-col items-center justify-center gap-3 rounded-card border border-border bg-surface px-6 text-center'
      role='alert'
    >
      <p className='m-0 text-lg font-semibold text-text-primary'>Could not load the schedule</p>

      <p className='m-0 max-w-md text-sm leading-6 text-text-secondary'>
        Something went wrong while loading bookings for this week.
      </p>

      <button
        type='button'
        className='mt-2 rounded-button bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-hover'
        onClick={onRetry}
      >
        Try again
      </button>
    </div>
  )
}

export default ScheduleErrorState
