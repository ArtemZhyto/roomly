'use client'

// Components
import PageHeader from '@components/layout/PageHeader'
import TimezoneBadge from '@components-shared/TimezoneBadge'

// Features
import {
  SchedulePageEmptyState,
  SchedulePageErrorState,
  SchedulePageLoadingState,
  WeeklySchedule,
  useSchedulePage,
} from '@features/schedule'

const SchedulePage = () => {
  const { selectedRoom, initialDate, status } = useSchedulePage()

  return (
    <div className='flex flex-col gap-8'>
      <PageHeader
        title='Schedule'
        description='View weekly room availability and choose a free 30-minute time slot.'
        aside={<TimezoneBadge />}
      />

      {status === 'loading' && <SchedulePageLoadingState />}

      {status === 'error' && <SchedulePageErrorState />}

      {status === 'success' && selectedRoom && (
        <WeeklySchedule room={selectedRoom} initialDate={initialDate} />
      )}

      {status === 'success' && !selectedRoom && <SchedulePageEmptyState />}
    </div>
  )
}

export default SchedulePage
