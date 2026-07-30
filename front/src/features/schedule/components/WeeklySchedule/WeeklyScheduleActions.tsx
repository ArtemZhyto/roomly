// Modules
import { CalendarPlus } from 'lucide-react'

interface WeeklyScheduleActionsProps {
  onBookRoom: () => void
}

const WeeklyScheduleActions = ({ onBookRoom }: WeeklyScheduleActionsProps) => {
  return (
    <div className='flex justify-end'>
      <button
        type='button'
        className='inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-control border border-primary bg-primary px-4 text-sm font-semibold text-text-inverse transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary-subtle'
        onClick={onBookRoom}
      >
        <CalendarPlus className='size-4' strokeWidth={2} aria-hidden='true' />
        Book a room
      </button>
    </div>
  )
}

export default WeeklyScheduleActions
