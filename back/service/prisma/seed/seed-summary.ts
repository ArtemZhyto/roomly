// Constants
import { TEST_PASSWORD, TEST_USERS } from './seed.constants'

export const printSeedSummary = (): void => {
  console.log('Database seeded successfully.')
  console.log('Created 3 users, 6 rooms, and 6 bookings.')
  console.log('')
  console.log('Test accounts:')
  console.log(`- ${TEST_USERS.olena.email} / ${TEST_PASSWORD}`)
  console.log(`- ${TEST_USERS.maksym.email} / ${TEST_PASSWORD}`)
  console.log(`- ${TEST_USERS.sofia.email} / ${TEST_PASSWORD}`)
}
