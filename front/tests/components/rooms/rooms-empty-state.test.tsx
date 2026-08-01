// Modules
import { describe, expect, it } from '@jest/globals'
import { render, screen } from '@testing-library/react'

// Components
import RoomsEmptyState from '@features/rooms/components/RoomsEmptyState/RoomsEmptyState'

describe('RoomsEmptyState', () => {
  it('shows the default empty state', () => {
    render(<RoomsEmptyState />)

    expect(
      screen.getByRole('heading', {
        name: 'No meeting rooms yet',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByText('Meeting rooms will appear here once they are added to the workspace.'),
    ).toBeInTheDocument()
  })

  it('shows the capacity-filter empty state', () => {
    render(<RoomsEmptyState minCapacity={12} />)

    expect(
      screen.getByRole('heading', {
        name: 'No rooms match this capacity',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByText('There are no meeting rooms for 12 or more people. Try a smaller capacity.'),
    ).toBeInTheDocument()
  })
})
