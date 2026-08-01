// Modules
import { CalendarRange } from 'lucide-react'

// Components
import EmptyState from '@components-ui/EmptyState'

// Local components
import ScheduleRoomAction from './ScheduleRoomAction'

const SchedulePageEmptyState = () => {
  return (
    <EmptyState
      icon={CalendarRange}
      title='Choose a room to view its schedule'
      description='Select a meeting room from the catalogue to open its weekly calendar.'
      action={<ScheduleRoomAction />}
    />
  )
}

export default SchedulePageEmptyState
