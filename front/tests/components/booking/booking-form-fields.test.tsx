// Modules
import { describe, expect, it, jest } from '@jest/globals'
import { fireEvent, render, screen } from '@testing-library/react'

// Components
import BookingForm from '@features/booking/components/BookingForm/BookingForm'

// Fixtures
import { TEST_ROOM } from './booking-form.fixture'

describe('BookingForm fields', () => {
  it('updates the meeting title', () => {
    render(<BookingForm room={TEST_ROOM} onCancel={jest.fn()} />)

    const titleInput = screen.getByLabelText('Meeting title')

    fireEvent.change(titleInput, {
      target: {
        value: 'Product planning',
      },
    })

    expect(titleInput).toHaveValue('Product planning')
    expect(screen.getByText('16/100')).toBeInTheDocument()
  })

  it('updates the booking date', () => {
    render(<BookingForm room={TEST_ROOM} onCancel={jest.fn()} />)

    const dateInput = screen.getByLabelText('Date')

    fireEvent.change(dateInput, {
      target: {
        value: '2030-06-15',
      },
    })

    expect(dateInput).toHaveValue('2030-06-15')
  })

  it('updates the start time', () => {
    render(<BookingForm room={TEST_ROOM} onCancel={jest.fn()} />)

    const startInput = screen.getByLabelText('Start time')

    fireEvent.change(startInput, {
      target: {
        value: '10:30',
      },
    })

    expect(startInput).toHaveValue('10:30')
  })

  it('updates the end time', () => {
    render(<BookingForm room={TEST_ROOM} onCancel={jest.fn()} />)

    const endInput = screen.getByLabelText('End time')

    fireEvent.change(endInput, {
      target: {
        value: '11:30',
      },
    })

    expect(endInput).toHaveValue('11:30')
  })
})
