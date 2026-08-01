// Modules
import { describe, expect, it } from '@jest/globals'

// Constants
import { CAPACITY_OPTIONS } from '@features/rooms/components/CapacityFilter/capacity-filter.constants'

describe('CAPACITY_OPTIONS', () => {
  it('starts with the unrestricted option', () => {
    expect(CAPACITY_OPTIONS[0]).toEqual({
      label: 'Any capacity',
    })
  })

  it('contains all supported minimum capacities', () => {
    expect(CAPACITY_OPTIONS.map((option) => option.value)).toEqual([undefined, 4, 5, 6, 8, 10, 16])
  })

  it('contains unique capacity values', () => {
    const values = CAPACITY_OPTIONS.map((option) => option.value)

    expect(new Set(values).size).toBe(values.length)
  })
})
