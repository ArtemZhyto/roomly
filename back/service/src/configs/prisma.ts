// Prisma
import { PrismaClient } from '../../prisma/generated/client'

// Modules
import { PrismaPg } from '@prisma/adapter-pg'

// Configs
import { env } from './env'

const adapter = new PrismaPg({
  connectionString: env.databaseUrl,
})

const prisma = new PrismaClient({
  adapter,
})

export default prisma
