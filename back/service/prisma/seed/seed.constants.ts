export const TEST_PASSWORD = 'Roomly123!'

export const TEST_USERS = {
  olena: {
    name: 'Olena Koval',
    email: 'olena.koval@roomly.dev',
  },

  maksym: {
    name: 'Maksym Bondar',
    email: 'maksym.bondar@roomly.dev',
  },

  sofia: {
    name: 'Sofia Melnyk',
    email: 'sofia.melnyk@roomly.dev',
  },
} as const

export const ROOMS = {
  horizon: {
    name: 'Horizon',
    floor: 2,
    capacity: 6,
  },

  atlas: {
    name: 'Atlas',
    floor: 3,
    capacity: 10,
  },

  focus: {
    name: 'Focus',
    floor: 2,
    capacity: 4,
  },

  boardroom: {
    name: 'Boardroom',
    floor: 4,
    capacity: 16,
  },

  lighthouse: {
    name: 'Lighthouse',
    floor: 1,
    capacity: 8,
  },

  garden: {
    name: 'Garden',
    floor: 3,
    capacity: 5,
  },
} as const
