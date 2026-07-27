// Modules
import { createHash, randomInt } from 'node:crypto'

export const generateVerificationCode = () => {
  return String(randomInt(100000, 1000000))
}

export const hashVerificationCode = (code: string) => {
  return createHash('sha256').update(code).digest('hex')
}
