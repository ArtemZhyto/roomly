// Modules
import { Clock3 } from 'lucide-react'

interface TimezoneBadgeProps {
  timezone?: string
}

const TimezoneBadge = ({ timezone = 'Europe/Kyiv' }: TimezoneBadgeProps) => {
  return (
    <div className='inline-flex min-h-10 items-center gap-2 rounded-control border border-border bg-surface px-3.5 text-sm font-medium text-text-secondary'>
      <Clock3 className='size-4 text-primary' strokeWidth={2} aria-hidden='true' />

      <span>Office time: {timezone}</span>
    </div>
  )
}

export default TimezoneBadge
