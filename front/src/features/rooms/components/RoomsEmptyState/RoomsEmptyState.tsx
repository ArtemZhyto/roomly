// Modules
import { DoorOpen, UsersRound } from 'lucide-react'

// Components
import EmptyState from '@components-ui/EmptyState'

interface RoomsEmptyStateProps {
  minCapacity?: number
}

const RoomsEmptyState = ({ minCapacity }: RoomsEmptyStateProps) => {
  if (minCapacity !== undefined) {
    return (
      <EmptyState
        icon={UsersRound}
        title='No rooms match this capacity'
        description={`There are no meeting rooms for ${minCapacity} or more people. Try a smaller capacity.`}
      />
    )
  }

  return (
    <EmptyState
      icon={DoorOpen}
      title='No meeting rooms yet'
      description='Meeting rooms will appear here once they are added to the workspace.'
    />
  )
}

export default RoomsEmptyState
