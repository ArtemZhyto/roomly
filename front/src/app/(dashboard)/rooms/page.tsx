'use client'

// Components
import PageHeader from '@components/layout/PageHeader'
import TimezoneBadge from '@components-shared/TimezoneBadge'

// Features
import {
  CapacityFilter,
  RoomsEmptyState,
  RoomsErrorState,
  RoomsGrid,
  RoomsLoadingState,
  useRoomsPage,
} from '@features/rooms'

const RoomsPage = () => {
  const { rooms, status, minCapacity, setMinCapacity, reloadRooms } = useRoomsPage()

  return (
    <div className='flex flex-col gap-8'>
      <PageHeader
        title='Meeting rooms'
        description='Choose a room to view its weekly schedule and find an available time.'
        aside={<TimezoneBadge />}
      />

      <section aria-labelledby='room-filters-title'>
        <h2 id='room-filters-title' className='sr-only'>
          Room filters
        </h2>

        <CapacityFilter value={minCapacity} onChange={setMinCapacity} />
      </section>

      {status === 'loading' && <RoomsLoadingState />}

      {status === 'error' && (
        <RoomsErrorState
          onRetry={() => {
            void reloadRooms()
          }}
        />
      )}

      {status === 'success' && rooms.length === 0 && <RoomsEmptyState minCapacity={minCapacity} />}

      {status === 'success' && rooms.length > 0 && <RoomsGrid rooms={rooms} />}
    </div>
  )
}

export default RoomsPage
