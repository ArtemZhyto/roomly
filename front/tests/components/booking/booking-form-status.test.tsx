// Modules
import { describe, expect, it, jest } from '@jest/globals'
import { render, screen } from '@testing-library/react'

// Components
import BookingForm from '@features/booking/components/BookingForm/BookingForm'

// Fixtures
import { TEST_ROOM } from './booking-form.fixture'

describe('BookingForm status', () => {
  it('disables controls while booking', () => {
    render(<BookingForm room={TEST_ROOM} status='loading' onCancel={jest.fn()} />)

    expect(screen.getByLabelText('Meeting title')).toBeDisabled()
    expect(screen.getByLabelText('Date')).toBeDisabled()

    expect(
      screen.getByRole('button', {
        name: 'Cancel',
      }),
    ).toBeDisabled()

    expect(
      screen.getByRole('button', {
        name: 'Booking...',
      }),
    ).toBeDisabled()
  })

  it('shows the default conflict message', () => {
    render(<BookingForm room={TEST_ROOM} status='conflict' onCancel={jest.fn()} />)

    expect(screen.getByRole('alert')).toHaveTextContent(
      'This time slot has already been booked. Choose another time.',
    )
  })

  it('shows the default server error', () => {
    render(<BookingForm room={TEST_ROOM} status='error' onCancel={jest.fn()} />)

    expect(screen.getByRole('alert')).toHaveTextContent(
      'The booking could not be created. Please try again.',
    )
  })

  it('shows a custom server error', () => {
    render(
      <BookingForm
        room={TEST_ROOM}
        status='error'
        serverError='The server is temporarily unavailable.'
        onCancel={jest.fn()}
      />,
    )

    expect(screen.getByRole('alert')).toHaveTextContent('The server is temporarily unavailable.')
  })
})
