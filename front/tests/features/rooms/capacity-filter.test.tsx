// Modules
import { describe, expect, it, jest } from '@jest/globals'
import { fireEvent, render, screen } from '@testing-library/react'

// Components
import CapacityFilter from '@features/rooms/components/CapacityFilter/CapacityFilter'

describe('CapacityFilter', () => {
  it('renders its label and hint', () => {
    render(<CapacityFilter value={undefined} onChange={jest.fn()} />)

    expect(screen.getByText('Minimum capacity')).toBeInTheDocument()

    expect(
      screen.getByText('Show rooms that can accommodate at least this many people.'),
    ).toBeInTheDocument()
  })

  it('shows the unrestricted option by default', () => {
    render(<CapacityFilter value={undefined} onChange={jest.fn()} />)

    expect(
      screen.getByRole('button', {
        name: /Any capacity/i,
      }),
    ).toBeInTheDocument()
  })

  it('shows the selected minimum capacity', () => {
    render(<CapacityFilter value={10} onChange={jest.fn()} />)

    expect(
      screen.getByRole('button', {
        name: /10\+ people/i,
      }),
    ).toBeInTheDocument()
  })

  it('opens the capacity menu', () => {
    render(<CapacityFilter value={undefined} onChange={jest.fn()} />)

    fireEvent.click(
      screen.getByRole('button', {
        name: /Any capacity/i,
      }),
    )

    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })

  it('calls onChange with the selected capacity', () => {
    const onChange = jest.fn()

    render(<CapacityFilter value={undefined} onChange={onChange} />)

    fireEvent.click(
      screen.getByRole('button', {
        name: /Any capacity/i,
      }),
    )

    fireEvent.click(
      screen.getByRole('option', {
        name: '8+ people',
      }),
    )

    expect(onChange).toHaveBeenCalledWith(8)
  })

  it('clears the capacity filter', () => {
    const onChange = jest.fn()

    render(<CapacityFilter value={8} onChange={onChange} />)

    fireEvent.click(
      screen.getByRole('button', {
        name: /8\+ people/i,
      }),
    )

    fireEvent.click(
      screen.getByRole('option', {
        name: 'Any capacity',
      }),
    )

    expect(onChange).toHaveBeenCalledWith(undefined)
  })
})
