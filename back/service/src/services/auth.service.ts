// Configs
import PRISMA from '@configs/config'

// Modules
import bcrypt from 'bcrypt'

// Interfaces
import { Register, Login } from '@ts/interfaces/auth'

// Helpers
import { createTokens } from '@helpers/createTokens'

export const authService = {
  register: async (data: Register) => {
    const existingUser = await PRISMA.user.findUnique({
      where: { email: data.email },
    })

    if (existingUser) {
      throw new Error('User with this email already exists')
    }

    const passwordHash = await bcrypt.hash(data.password, 11)

    const user = await PRISMA.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash,
      },
      select: { id: true },
    })

    const { accessToken, refreshToken } = createTokens({
      id: user.id,
      email: data.email,
    })

    return {
      accessToken,
      refreshToken,
    }
  },

  login: async (data: Login) => {
    const user = await PRISMA.user.findUnique({
      where: { email: data.email },
    })

    if (!user) {
      throw new Error('Invalid email or password')
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.passwordHash)

    if (!isPasswordValid) {
      throw new Error('Invalid email or password')
    }

    const { accessToken, refreshToken } = await createTokens({
      id: user.id,
      email: user.email,
    })

    return { accessToken, refreshToken }
  },
}
