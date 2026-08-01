// Modules
import { describe, expect, it } from '@jest/globals'
import { render, screen } from '@testing-library/react'

// Components
import MyBookingsSkeleton from '@features/my-bookings/components/MyBookingsView/MyBookingsSkeleton'

describe('MyBookingsSkeleton', () => {
  it('renders an accessible loading status', () => {
    render(<MyBookingsSkeleton />)

    expect(
      screen.getByRole('status', {
        name: 'Loading bookings',
      }),
    ).toBeInTheDocument()
  })

  it('renders a screen-reader loading message', () => {
    render(<MyBookingsSkeleton />)

    expect(screen.getByText('Loading bookings...')).toBeInTheDocument()
  })
})
