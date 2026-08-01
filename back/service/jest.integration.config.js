// Modules
const baseConfig = require('./jest.config')

module.exports = {
  displayName: 'roomly-service-integration',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/integration/**/*.test.ts'],

  setupFiles: ['<rootDir>/tests/setup/integration-env.mjs'],

  extensionsToTreatAsEsm: ['.ts'],

  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: '<rootDir>/tsconfig.integration.json',
      },
    ],
  },

  moduleNameMapper: {
    ...baseConfig.moduleNameMapper,
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },

  clearMocks: true,
  restoreMocks: true,
  testTimeout: 15000,
}
