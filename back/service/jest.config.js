module.exports = {
  displayName: 'roomly-service',
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.test.ts'],

  setupFiles: ['<rootDir>/tests/setup/unit-env.ts'],

  moduleNameMapper: {
    '^@configs/(.*)$': '<rootDir>/src/configs/$1',
    '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',
    '^@errors/(.*)$': '<rootDir>/src/errors/$1',
    '^@helpers/(.*)$': '<rootDir>/src/helpers/$1',
    '^@middlewares/(.*)$': '<rootDir>/src/middlewares/$1',
    '^@routes/(.*)$': '<rootDir>/src/routes/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@sockets/(.*)$': '<rootDir>/src/sockets/$1',
    '^@validation/(.*)$': '<rootDir>/src/validation/$1',
    '^@workers/(.*)$': '<rootDir>/src/workers/$1',
  },

  clearMocks: true,
  restoreMocks: true,
  testTimeout: 15000,
}
