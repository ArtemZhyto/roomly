// Prisma
import type { Prisma } from '../generated/client'

// Constants
import { TEST_USERS } from './seed.constants'

interface SeedUsersParams {
  transaction: Prisma.TransactionClient
  passwordHash: string
}

export const seedUsers = async ({ transaction, passwordHash }: SeedUsersParams) => {
  const verifiedAt = new Date()

  const olena = await transaction.user.upsert({
    where: {
      email: TEST_USERS.olena.email,
    },

    update: {
      name: TEST_USERS.olena.name,
      passwordHash,
      emailVerifiedAt: verifiedAt,
    },

    create: {
      name: TEST_USERS.olena.name,
      email: TEST_USERS.olena.email,
      passwordHash,
      emailVerifiedAt: verifiedAt,
    },
  })

  const maksym = await transaction.user.upsert({
    where: {
      email: TEST_USERS.maksym.email,
    },

    update: {
      name: TEST_USERS.maksym.name,
      passwordHash,
      emailVerifiedAt: verifiedAt,
    },

    create: {
      name: TEST_USERS.maksym.name,
      email: TEST_USERS.maksym.email,
      passwordHash,
      emailVerifiedAt: verifiedAt,
    },
  })

  const sofia = await transaction.user.upsert({
    where: {
      email: TEST_USERS.sofia.email,
    },

    update: {
      name: TEST_USERS.sofia.name,
      passwordHash,
      emailVerifiedAt: verifiedAt,
    },

    create: {
      name: TEST_USERS.sofia.name,
      email: TEST_USERS.sofia.email,
      passwordHash,
      emailVerifiedAt: verifiedAt,
    },
  })

  return {
    olena,
    maksym,
    sofia,
  }
}

export type SeededUsers = Awaited<ReturnType<typeof seedUsers>>
