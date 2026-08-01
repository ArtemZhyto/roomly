// Modules
import { describe, expect, it } from '@jest/globals'
import { render, screen } from '@testing-library/react'

// Components
import MyBookingsEmptyState from '@features/my-bookings/components/MyBookingsView/MyBookingsEmptyState'

describe('MyBookingsEmptyState', () => {
  it('shows the upcoming bookings empty state', () => {
    render(<MyBookingsEmptyState period='upcoming' />)

    expect(
      screen.getByRole('heading', {
        name: 'No upcoming bookings',
      }),
    ).toBeInTheDocument()

    expect(screen.getByText('Your future room reservations will appear here.')).toBeInTheDocument()
  })

  it('shows the past bookings empty state', () => {
    render(<MyBookingsEmptyState period='past' />)

    expect(
      screen.getByRole('heading', {
        name: 'No past bookings',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByText('Your completed room reservations will appear here.'),
    ).toBeInTheDocument()
  })
})
