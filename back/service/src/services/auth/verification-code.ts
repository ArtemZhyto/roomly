// Modules
import { createHash, randomInt } from 'node:crypto'

const VERIFICATION_CODE_MINIMUM = 100_000
const VERIFICATION_CODE_MAXIMUM = 1_000_000

export const generateVerificationCode = (): string => {
  return String(randomInt(VERIFICATION_CODE_MINIMUM, VERIFICATION_CODE_MAXIMUM))
}

export const hashVerificationCode = (code: string): string => {
  return createHash('sha256').update(code).digest('hex')
}
