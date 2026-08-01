// Modules
import { describe, expect, it } from '@jest/globals'
import { render, screen } from '@testing-library/react'

// Components
import SchedulePageEmptyState from '@features/schedule/components/SchedulePageState/SchedulePageEmptyState'
import SchedulePageErrorState from '@features/schedule/components/SchedulePageState/SchedulePageErrorState'

describe('SchedulePageEmptyState', () => {
  it('asks the user to select a room', () => {
    render(<SchedulePageEmptyState />)

    expect(
      screen.getByRole('heading', {
        name: 'Choose a room to view its schedule',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('link', {
        name: 'Select a room',
      }),
    ).toHaveAttribute('href', '/rooms')
  })
})

describe('SchedulePageErrorState', () => {
  it('shows the schedule loading error', () => {
    render(<SchedulePageErrorState />)

    expect(
      screen.getByRole('heading', {
        name: 'Could not load room schedule',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('link', {
        name: 'Select a room',
      }),
    ).toHaveAttribute('href', '/rooms')
  })
})
