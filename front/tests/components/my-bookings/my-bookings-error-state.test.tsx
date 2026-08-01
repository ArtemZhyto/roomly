// Modules
import { describe, expect, it, jest } from '@jest/globals'
import { fireEvent, render, screen } from '@testing-library/react'

// Components
import MyBookingsErrorState from '@features/my-bookings/components/MyBookingsView/MyBookingsErrorState'

describe('MyBookingsErrorState', () => {
  it('shows the bookings loading error', () => {
    render(<MyBookingsErrorState onRetry={jest.fn()} />)

    expect(
      screen.getByRole('heading', {
        name: 'Could not load bookings',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByText('Something went wrong while loading your bookings. Please try again.'),
    ).toBeInTheDocument()
  })

  it('calls onRetry when the user clicks try again', () => {
    const onRetry = jest.fn()

    render(<MyBookingsErrorState onRetry={onRetry} />)

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Try again',
      }),
    )

    expect(onRetry).toHaveBeenCalledTimes(1)
  })
})
