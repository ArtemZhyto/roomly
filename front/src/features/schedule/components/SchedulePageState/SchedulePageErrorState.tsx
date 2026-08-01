// Modules
import { CalendarRange } from 'lucide-react'

// Components
import EmptyState from '@components-ui/EmptyState'

// Local components
import ScheduleRoomAction from './ScheduleRoomAction'

const SchedulePageErrorState = () => {
  return (
    <EmptyState
      icon={CalendarRange}
      title='Could not load room schedule'
      description='Something went wrong while loading the selected room.'
      action={<ScheduleRoomAction />}
    />
  )
}

export default SchedulePageErrorState
