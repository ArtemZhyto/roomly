// Modules
import bcrypt from 'bcrypt'

// Configs
import { prisma } from '@configs/index'

interface CreateTestUserOptions {
  name?: string
  email?: string
  password?: string
  isVerified?: boolean
}

interface CreateTestRoomOptions {
  name?: string
  floor?: number
  capacity?: number
}

export const TEST_PASSWORD = 'TestPassword123'

export const createTestUser = async ({
  name = 'Test User',
  email = 'test.user@roomly.dev',
  password = TEST_PASSWORD,
  isVerified = true,
}: CreateTestUserOptions = {}) => {
  const passwordHash = await bcrypt.hash(password, 10)

  return prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      emailVerifiedAt: isVerified ? new Date() : null,
    },
  })
}

export const createTestRoom = async ({
  name = 'Integration Room',
  floor = 2,
  capacity = 8,
}: CreateTestRoomOptions = {}) => {
  return prisma.room.create({
    data: {
      name,
      floor,
      capacity,
    },
  })
}
