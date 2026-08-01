// Modules
import { Prisma } from '../../../prisma/generated/client'

// Configs
import { env, prisma } from '@configs/index'

// Sockets
import { getSocketServer, getUserRoomName } from '@sockets/socket'

if (!Number.isInteger(env.notifyBeforeMinutes) || env.notifyBeforeMinutes < 1) {
  throw new Error('env.notifyBeforeMinutes is not configured correctly')
}

const MINUTE_IN_MILLISECONDS = 60_000

interface CurrentBooking {
  id: number
  title: string
  roomId: number
  userId: number
  endTime: Date
  room: {
    name: string
  }
}

const getNotificationThreshold = (now: Date): Date => {
  return new Date(now.getTime() + env.notifyBeforeMinutes * MINUTE_IN_MILLISECONDS)
}

const getBookingsEndingSoon = async (now: Date): Promise<CurrentBooking[]> => {
  return prisma.booking.findMany({
    where: {
      endTime: {
        gt: now,
        lte: getNotificationThreshold(now),
      },

      currentBookingNotifications: {
        none: {},
      },
    },

    select: {
      id: true,
      title: true,
      roomId: true,
      userId: true,
      endTime: true,

      room: {
        select: {
          name: true,
        },
      },
    },
  })
}

const getImmediatelyFollowingBooking = async (currentBooking: CurrentBooking) => {
  return prisma.booking.findFirst({
    where: {
      roomId: currentBooking.roomId,
      startTime: currentBooking.endTime,
    },

    select: {
      id: true,
    },
  })
}

const createNotificationMessage = (currentBooking: CurrentBooking): string => {
  return (
    `Your booking "${currentBooking.title}" in ` +
    `${currentBooking.room.name} ends in ` +
    `${env.notifyBeforeMinutes} minutes. ` +
    'The room is booked immediately afterwards.'
  )
}

const isDuplicateNotificationError = (error: unknown): boolean => {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002'
}

const createAndEmitNotification = async (
  currentBooking: CurrentBooking,
  nextBookingId: number,
): Promise<void> => {
  const notification = await prisma.notification.create({
    data: {
      userId: currentBooking.userId,
      currentBookingId: currentBooking.id,
      nextBookingId,
      message: createNotificationMessage(currentBooking),
    },
  })

  getSocketServer()
    .to(getUserRoomName(currentBooking.userId))
    .emit('notification:new', notification)
}

const processBookingNotification = async (currentBooking: CurrentBooking): Promise<void> => {
  const nextBooking = await getImmediatelyFollowingBooking(currentBooking)

  if (!nextBooking) {
    return
  }

  try {
    await createAndEmitNotification(currentBooking, nextBooking.id)
  } catch (error: unknown) {
    if (isDuplicateNotificationError(error)) {
      return
    }

    throw error
  }
}

export const processDueNotifications = async (): Promise<void> => {
  const currentBookings = await getBookingsEndingSoon(new Date())

  for (const currentBooking of currentBookings) {
    await processBookingNotification(currentBooking)
  }
}
