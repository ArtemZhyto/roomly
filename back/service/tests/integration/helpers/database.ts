// Configs
import { prisma } from '@configs/index'

export const clearTestDatabase = async (): Promise<void> => {
  await prisma.notification.deleteMany()
  await prisma.booking.deleteMany()
  await prisma.bookingSeries.deleteMany()
  await prisma.emailVerificationCode.deleteMany()
  await prisma.passwordResetToken.deleteMany()
  await prisma.room.deleteMany()
  await prisma.user.deleteMany()
}

export const disconnectTestDatabase = async (): Promise<void> => {
  await prisma.$disconnect()
}
