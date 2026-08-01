// Modules
import { describe, expect, it, jest } from '@jest/globals'
import { fireEvent, render, screen } from '@testing-library/react'

// Components
import RoomsErrorState from '@features/rooms/components/RoomsErrorState/RoomsErrorState'

describe('RoomsErrorState', () => {
  it('shows the room loading error', () => {
    render(<RoomsErrorState onRetry={jest.fn()} />)

    expect(
      screen.getByRole('heading', {
        name: 'Could not load meeting rooms',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByText('Something went wrong while loading the room catalogue. Please try again.'),
    ).toBeInTheDocument()
  })

  it('calls onRetry when the user clicks try again', () => {
    const onRetry = jest.fn()

    render(<RoomsErrorState onRetry={onRetry} />)

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Try again',
      }),
    )

    expect(onRetry).toHaveBeenCalledTimes(1)
  })
})
