// Modules
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals'
import { fireEvent, render, screen } from '@testing-library/react'

// Components
import BookingForm from '@features/booking/components/BookingForm/BookingForm'

// Fixtures
import { TEST_ROOM } from './booking-form.fixture'

const getRecurrenceCheckbox = () => {
  return screen.getByRole('checkbox', {
    name: /Repeat weekly/i,
  })
}

describe('BookingForm submission', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date(2030, 5, 1, 12, 0, 0))
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('submits normalized booking values', () => {
    const onSubmit = jest.fn()

    render(
      <BookingForm
        room={TEST_ROOM}
        initialDate='2030-06-15'
        initialStartTime='10:00'
        initialEndTime='11:00'
        onCancel={jest.fn()}
        onSubmit={onSubmit}
      />,
    )

    fireEvent.change(screen.getByLabelText('Meeting title'), {
      target: {
        value: '  Product planning  ',
      },
    })

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Book room',
      }),
    )

    expect(onSubmit).toHaveBeenCalledWith({
      title: 'Product planning',
      roomId: TEST_ROOM.id,
      date: '2030-06-15',
      startTime: '10:00',
      endTime: '11:00',
      repeatWeekly: false,
      recurrenceCount: '2',
    })
  })

  it('submits recurrence values', () => {
    const onSubmit = jest.fn()

    render(
      <BookingForm
        room={TEST_ROOM}
        initialDate='2030-06-15'
        initialStartTime='10:00'
        initialEndTime='11:00'
        onCancel={jest.fn()}
        onSubmit={onSubmit}
      />,
    )

    fireEvent.change(screen.getByLabelText('Meeting title'), {
      target: {
        value: 'Weekly planning',
      },
    })

    fireEvent.click(getRecurrenceCheckbox())

    fireEvent.change(screen.getByRole('spinbutton'), {
      target: {
        value: '6',
      },
    })

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Book room',
      }),
    )

    expect(onSubmit).toHaveBeenCalledWith({
      title: 'Weekly planning',
      roomId: TEST_ROOM.id,
      date: '2030-06-15',
      startTime: '10:00',
      endTime: '11:00',
      repeatWeekly: true,
      recurrenceCount: '6',
    })
  })
})
