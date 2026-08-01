// Types
import type { HelmetOptions } from 'helmet'

export const helmetOptions: HelmetOptions = {
  crossOriginResourcePolicy: {
    policy: 'cross-origin',
  },

  contentSecurityPolicy: {
    directives: {
      defaultSrc: [`'self'`],
      scriptSrc: [`'self'`],
      styleSrc: [`'self'`],
      imgSrc: [`'self'`, 'data:'],
      fontSrc: [`'self'`],
      objectSrc: [`'none'`],
      frameAncestors: [`'self'`],
    },
  },
}
