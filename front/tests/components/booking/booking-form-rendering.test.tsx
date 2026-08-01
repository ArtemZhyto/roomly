// Modules
import { describe, expect, it, jest } from '@jest/globals'
import { render, screen } from '@testing-library/react'

// Components
import BookingForm from '@features/booking/components/BookingForm/BookingForm'

// Fixtures
import { TEST_ROOM } from './booking-form.fixture'

describe('BookingForm rendering', () => {
  it('renders the room information', () => {
    render(<BookingForm room={TEST_ROOM} onCancel={jest.fn()} />)

    expect(screen.getByText('Atlas · Floor 3 · 10 people')).toBeInTheDocument()
  })

  it('renders booking fields', () => {
    render(<BookingForm room={TEST_ROOM} onCancel={jest.fn()} />)

    expect(screen.getByLabelText('Meeting title')).toBeInTheDocument()
    expect(screen.getByLabelText('Date')).toBeInTheDocument()
    expect(screen.getByLabelText('Start time')).toBeInTheDocument()
    expect(screen.getByLabelText('End time')).toBeInTheDocument()

    expect(
      screen.getByRole('checkbox', {
        name: /Repeat weekly/i,
      }),
    ).toBeInTheDocument()
  })

  it('uses the initial booking values', () => {
    render(
      <BookingForm
        room={TEST_ROOM}
        initialDate='2030-06-15'
        initialStartTime='10:00'
        initialEndTime='11:30'
        onCancel={jest.fn()}
      />,
    )

    expect(screen.getByLabelText('Date')).toHaveValue('2030-06-15')
    expect(screen.getByLabelText('Start time')).toHaveValue('10:00')
    expect(screen.getByLabelText('End time')).toHaveValue('11:30')
  })

  it('renders the form actions', () => {
    render(<BookingForm room={TEST_ROOM} onCancel={jest.fn()} />)

    expect(
      screen.getByRole('button', {
        name: 'Cancel',
      }),
    ).toBeEnabled()

    expect(
      screen.getByRole('button', {
        name: 'Book room',
      }),
    ).toBeEnabled()
  })
})
